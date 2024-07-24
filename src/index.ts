import { Hono } from 'hono'

export type Bindings = {
  AUTH: Fetcher
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const res = await c.env.AUTH.fetch('http://localhost')

  if (res.status !== 200) {
    console.error(await res.text())
    return c.json({ message: 'Authentication failed' }, 401)
  }

  const json: { message: string } = await res.json()

  return c.json(json)
})

export default app
