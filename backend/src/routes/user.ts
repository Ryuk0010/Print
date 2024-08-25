import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
// import { signupInput, signinInput } from "@ryuk01/medium_common"
import { signupInput } from '../../../common/src/index'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>()

  userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const validation = signupInput.safeParse(body);
  
    if (!validation.success) {
      c.status(403);
      return c.json({
        Message: "Input not valid",
        Errors: validation.error.errors,
      });
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password, // You should hash this before saving
          name: body.name,
        },
      });
  
      const secret = c.env.JWT_SECRET;
      const token = await sign({ id: user.id }, secret);
  
      return c.json({
        token,
      });
    } catch (e) {
      console.error("Error during signup:", e);
      return c.json({ error: "Error while signing up" });
    }
  });
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const body = await c.req.json();
    const result = signupInput.safeParse(body);
    if (!result.success) {
      console.log(result.error.errors);
      c.status(403);
      return c.json({
        Message: "Input not valid",
        Errors: result.error.errors,
      });
    }
    
    const user = await prisma.user.findUnique({
      where:{
        email: body.email,
        password: body.password
      }
    })
    if(!user){
      c.status(403)
      return c.json({
        error: "User not found"
      })
    }
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({jwt});
  })


