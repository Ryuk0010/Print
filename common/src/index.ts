import z from "zod"

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

export const createContent = z.object({
    title: z.string(),
    content: z.string()
})


export const updateContent = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})
export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type createContent = z.infer<typeof createContent>
export type updateContent = z.infer<typeof updateContent>