/**
 * The canvas renderer, the default for live avatars: paints flat avatar frames
 * to one canvas, so an avatar costs one compositor layer and one small bitmap
 * however many slices it shows. Equal geometry shares its parsed paths.
 *
 * The bitmap covers what the frames actually paint, plus slack, and only grows
 * while the avatar's size and the pixel ratio stay the same. A GPU canvas that
 * animates antialiased paths holds several times its bitmap in video memory,
 * so covering every possible view up front (avatarExtent, kept as the upper
 * bound) would cost about three times as much.
 *
 * The canvas sits in a wrapper at the host's content box, as the scene does,
 * overhangs it by the avatar's reach and ignores the pointer.
 */
import { avatarExtent } from '../render.js';
/** Slack around a frame's bounds when the bitmap is laid out, viewBox units: idle motion and gaze stay inside it. */
export const FIT_SLACK = 8;
/** Margin a frame keeps from the bitmap's edge for antialiasing, viewBox units. */
export const FIT_PAD = 1;
/**
 * The square to lay the bitmap out over: `prev` while it still holds `b`, else `prev` grown to
 * hold `b` with slack. Never larger than `cap` unless `b` itself leaves `cap`.
 */
export function fitSquare(prev, b, cap) {
    if (!(b.x0 <= b.x1 && b.y0 <= b.y1))
        return prev ?? cap;
    if (prev &&
        b.x0 - FIT_PAD >= prev.x &&
        b.y0 - FIT_PAD >= prev.y &&
        b.x1 + FIT_PAD <= prev.x + prev.size &&
        b.y1 + FIT_PAD <= prev.y + prev.size) {
        return prev;
    }
    let x0 = b.x0 - FIT_SLACK, y0 = b.y0 - FIT_SLACK, x1 = b.x1 + FIT_SLACK, y1 = b.y1 + FIT_SLACK;
    if (prev) {
        x0 = Math.min(x0, prev.x);
        y0 = Math.min(y0, prev.y);
        x1 = Math.max(x1, prev.x + prev.size);
        y1 = Math.max(y1, prev.y + prev.size);
    }
    const size = Math.max(x1 - x0, y1 - y0);
    const inCap = b.x0 >= cap.x && b.y0 >= cap.y && b.x1 <= cap.x + cap.size && b.y1 <= cap.y + cap.size;
    if (size >= cap.size && inCap)
        return cap;
    return { x: (x0 + x1 - size) / 2, y: (y0 + y1 - size) / 2, size };
}
const MAX_SECTIONS = 4096;
const sections = new Map();
let supported;
/** Whether this environment can paint avatars: a 2D canvas and Path2D (jsdom has neither). */
export function canvasSupported() {
    if (supported === undefined) {
        // Path2D first: asking jsdom for a context logs a "not implemented" error.
        supported = typeof Path2D !== 'undefined' && typeof document !== 'undefined' && !!document.createElement('canvas').getContext('2d');
    }
    return supported;
}
/**
 * Each shape's matrix with the frame's root motion applied, and the bounds of everything the frame
 * paints, in viewBox units. Pure.
 */
export function framePlacement(frame) {
    const boxes = new Map(frame.paths.map((p) => [p.id, p.box]));
    const [ra, rb, rc, rd, re, rf] = frame.root;
    const bounds = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    const add = (m, x, y) => {
        const X = m[0] * x + m[2] * y + m[4], Y = m[1] * x + m[3] * y + m[5];
        if (X < bounds.x0)
            bounds.x0 = X;
        if (X > bounds.x1)
            bounds.x1 = X;
        if (Y < bounds.y0)
            bounds.y0 = Y;
        if (Y > bounds.y1)
            bounds.y1 = Y;
    };
    const matrices = frame.shapes.map((shape) => {
        const [a, b, c, d, e, f] = shape.matrix;
        const m = [ra * a + rc * b, rb * a + rd * b, ra * c + rc * d, rb * c + rd * d, ra * e + rc * f + re, rb * e + rd * f + rf];
        const box = shape.kind === 'slice' ? boxes.get(shape.path) : eyeBox(shape.mark);
        if (box) {
            add(m, box.x, box.y);
            add(m, box.x + box.w, box.y);
            add(m, box.x, box.y + box.h);
            add(m, box.x + box.w, box.y + box.h);
        }
        return m;
    });
    return { matrices, bounds };
}
function eyeBox(mark) {
    if (mark.shape === 'pill')
        return { x: mark.x, y: mark.y, w: mark.width, h: mark.height };
    // A quadratic arc lies within its points' hull; the stroke reaches half its width past it.
    const n = (mark.d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
    const x = Math.min(...xs) - mark.strokeWidth, y = Math.min(...ys) - mark.strokeWidth;
    return { x, y, w: Math.max(...xs) + mark.strokeWidth - x, h: Math.max(...ys) + mark.strokeWidth - y };
}
function eye(ctx, mark) {
    if (mark.shape === 'arc') {
        ctx.lineWidth = mark.strokeWidth;
        ctx.stroke(new Path2D(mark.d));
        return;
    }
    const { x, y, width: w, height: h, radius: r } = mark;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function')
        ctx.roundRect(x, y, w, h, r);
    else {
        // Safari before 16 and Firefox before 112.
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }
    ctx.fill();
}
export function mountCanvas(el, key, definition, depth) {
    const cap = avatarExtent(definition, depth);
    const wrap = document.createElement('div');
    // In flow at the content box, like the scene's root, so the host's padding and border place it.
    wrap.style.cssText = 'position:relative;width:100%;height:100%;pointer-events:none';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute';
    wrap.append(canvas);
    el.replaceChildren(wrap);
    return { key, canvas, ctx: canvas.getContext('2d'), cap, fit: null, layout: '', left: 0, top: 0 };
}
/** Paint one frame `size` CSS pixels wide. `fill` and `ink` override the frame's colors with any canvas color. */
export function paintCanvas(surface, frame, size, fill = frame.color, ink = frame.ink) {
    const { canvas, ctx } = surface;
    if (!ctx || size <= 0)
        return;
    const dpr = window.devicePixelRatio || 1;
    const scale = (size / 100) * dpr;
    const layout = `${size}|${dpr}`;
    if (sections.size > MAX_SECTIONS)
        sections.clear();
    for (const { id, d, evenOdd } of frame.paths) {
        if (!sections.has(id))
            sections.set(id, { path: new Path2D(d), rule: evenOdd ? 'evenodd' : 'nonzero' });
    }
    const { matrices, bounds } = framePlacement(frame);
    const fit = fitSquare(surface.layout === layout ? surface.fit : null, bounds, surface.cap);
    if (surface.layout === layout && fit === surface.fit) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else {
        // Whole device pixels, so the bitmap is never resampled. Setting the width also clears it.
        surface.layout = layout;
        surface.fit = fit;
        surface.left = Math.floor(fit.x * scale);
        surface.top = Math.floor(fit.y * scale);
        const bitmap = Math.ceil(fit.size * scale) + 1;
        canvas.width = canvas.height = bitmap;
        canvas.style.left = `${surface.left / dpr}px`;
        canvas.style.top = `${surface.top / dpr}px`;
        canvas.style.width = canvas.style.height = `${bitmap / dpr}px`;
    }
    ctx.lineCap = 'round';
    ctx.strokeStyle = ink;
    ctx.fillStyle = fill;
    // Shapes run in the thousands per second across a page: one setTransform each beats save/restore.
    for (let i = 0; i < frame.shapes.length; i++) {
        const shape = frame.shapes[i], m = matrices[i];
        ctx.setTransform(scale * m[0], scale * m[1], scale * m[2], scale * m[3], scale * m[4] - surface.left, scale * m[5] - surface.top);
        if (shape.kind === 'slice') {
            const section = sections.get(shape.path);
            ctx.fill(section.path, section.rule);
        }
        else {
            ctx.fillStyle = ink;
            eye(ctx, shape.mark);
            ctx.fillStyle = fill;
        }
    }
}
//# sourceMappingURL=paint.js.map