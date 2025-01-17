import z from "zod"
export const signUpInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()

})
export type SignInInput=z.infer<typeof signUpInput>

export const createBlogInput=z.object({
    title:z.string(),
    content:z.string()

})
export type CreateBlogInput=z.infer<typeof createBlogInput>

export const updateBlogInput=z.object({
    title:z.string(),
    content:z.string(),
    id: z.union([z.number(), z.string()])

})
export type UpdateBlogInput=z.infer<typeof updateBlogInput>