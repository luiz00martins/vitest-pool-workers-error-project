import { env } from "cloudflare:test"
import { expect, test } from "vitest"
import app from "../src"
// comment

test("Get user without Auth", async () => {
  const res = await app.request(
    "/",
    { method: "GET" },
    env
  )

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({ message: "Authentication done" })
})
