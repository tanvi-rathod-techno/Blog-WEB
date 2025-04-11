// src/validations/blog.validation.ts

import { z } from 'zod'

export const blogSchema = z.object({
    blog_title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be less than 100 characters' }),

  blog_content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' }),
})

export type BlogSchema = z.infer<typeof blogSchema>
