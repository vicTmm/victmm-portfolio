/**
 * Iso-contours of a sampled scalar field (marching squares), assembled into
 * closed loops and simplified. Used once per definition to turn a part's
 * depth field into plain cross-section paths, so slices need no SVG masks.
 */
import type { Point } from './path.ts';
export interface Field {
    /** Row-major samples, nx * ny. The outermost ring should be below every level. */
    values: Float64Array;
    nx: number;
    ny: number;
    x0: number;
    y0: number;
    step: number;
}
/** Closed loops where the field crosses `level` (inside = value ≥ level). */
export declare function contourLoops(field: Field, level: number): Point[][];
/** Ramer-Douglas-Peucker on a closed loop. */
export declare function simplifyLoop(loop: Point[], tolerance: number): Point[];
/**
 * Compact closed path from loops (draw with fill-rule evenodd). Traced loops are polylines, so
 * gentle turns are drawn as quadratics between edge midpoints, which hides their facets at large
 * sizes; real corners stay sharp. Relative commands, smooth t segments and implicit repeats keep
 * the string short.
 */
export declare function loopsToPath(loops: Point[][]): string;
//# sourceMappingURL=contour.d.ts.map