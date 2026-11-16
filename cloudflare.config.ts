import { defineConfig, bindings, exports } from "cf/config";

export default defineConfig({
  accountId: "79713c6296c1f11ea71c1efce251bfed",
  worker: {
    "name": "portfolio",
    "entrypoint": "./worker.js",
    "compatibilityDate": "2026-11-16",
    assets: { runWorkerFirst: ["/api/*"] },
    env: {
      ASSETS: bindings.assets(),
      LIKES: bindings.durableObject({worker:"portfolio", exportName:"PortfolioLikes"})
    },
    exports: { PortfolioLikes: exports.durableObject({storage:"sqlite"}) },
    "observability": {
      "enabled": true,
      "traces": { "enabled": true }
    }
  }
});
