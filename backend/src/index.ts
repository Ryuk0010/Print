import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// app.use('/api/v1/blog/*', async (c, next) => {
//   const jwt = await c.req.header();
//   if(!jwt){
//     c.status(401)
//     return c.json({
//       error: "unauthorized"
//     })
//   }
//   const token = jwt.split(' ')[1];
//   const payload = await verify(token, c.env.JWT_SECRET)
//   if (!payload) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
//   else await next()
// })
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);




export default app
