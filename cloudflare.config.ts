import { defineConfig } from "cf/config";

export default defineConfig({
  accountId: "79713c6296c1f11ea71c1efce251bfed",
  worker: {
    "name": "portfolio",
    "compatibilityDate": "2026-11-16",
    "observability": {
      "enabled": true,
      "traces": { "enabled": true }
    }
  }
});
