import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createContent, updateContent } from "@ryuk01/medium_common"

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    },
    Variables:{
        authorId: string
    }
  }>()

  blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization') || "";
    try{
        if (jwt) {
            const token = jwt;
            const payload = await verify(token, c.env.JWT_SECRET);
            c.set('authorId', payload.id as string);
            await next()
        }
        else {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }

        }
    catch(e){
        c.status(401);
        return c.json({ error: "unauthorized" });           
    }
})

// blogRouter.use("/*", async (c, next) => {
//     const authHeader = c.req.header("authorization") || "";

//     // Check if Authorization header is present
//     if (!authHeader) {
//         c.status(403);
//         return c.json({
//             message: "Authorization header missing"
//         });
//     }

//     try {
//         // Verify the token
//         const token = authHeader; // Ensure this is the correct token format
//         const payload = await verify(token, c.env.JWT_SECRET);
        
//         // Debugging information
//         console.log('Authorization header:', authHeader); // Check the raw header
//         console.log('Payload:', payload); // Check the decoded payload

//         if (payload) {
//             // Store the author ID if the token is valid
//             c.set("authorId", payload.id as string);
//             await next();
//         } else {
//             c.status(403);
//             return c.json({
//                 message: "Invalid token"
//             });
//         }
//     } catch (e) {
//         // Log the error and provide detailed message
//         console.error('Error during token verification:', e); // Log the error

//         c.status(403);
//         return c.json({
//             message: "Invalid token or verification error",
//             // @ts-ignore
//             error: e.message // Provide the error message
//         });
//     }
// });



blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const success = createContent.safeParse(body)
    if(!success){
        c.status(403);
        return c.json({
            Message: "Input not valid"
        })
    }
    const authorId = c.get('authorId');
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: blog.id
    })
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        const success = updateContent.safeParse(body)
        if(!success){
            c.status(403);
            return c.json({
            Message: "Input not valid"
        })
        }
        const post = await prisma.post.update({
            where:{
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: post.id
        })
  })

  blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const content = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        console.log(content); // For debugging

        return c.json({
            content
        });
    } catch (error) {
        console.error('Database error:', error); // For debugging
        c.status(500);
        return c.json({
            message: "Internal server error"
        });
    }
});


  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const id = c.req.param("id")
        try{
            const post = await prisma.post.findFirst({
                where: {
                    id: id
                },
                select:{
                    id: true,
                    title: true,
                    content: true,
                    author:{
                        select:{
                            name: true
                        }
                    }
                }
            })
            return c.json({
                post
            })
        }
        catch(e){
            c.status(411);
            return c.json({
                message: "Blog not Found"
            })
        }
  })
  
