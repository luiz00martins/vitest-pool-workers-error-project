import {
  defineWorkersProject,
} from "@cloudflare/vitest-pool-workers/config"
import { Response } from "miniflare"

export default defineWorkersProject(async () => {
  return {
    test: {
      dir: "./test",
      poolOptions: {
        workers: {
          singleWorker: true,
          main: "./src/index.ts",
          wrangler: {
            configPath: "./wrangler.toml",
          },
          miniflare: {
            serviceBindings: {
              AUTH: async (_req, mf) => {
                await mf.ready
                return Response.json({ message: "Authentication done" }, { status: 200 })
              },
            },
          },
        },
      },
    },
  }
})
