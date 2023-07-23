import { z } from "zod";
import { bookGenres } from "./book.constant";

export const createBookZodValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        author: z.string({
            required_error: "Author is required",
        }),
        genre: z.enum([...bookGenres] as [string, ...string[]], {
            required_error: "Genre is required",
        }),
        publishedAt: z.string({
            required_error: "Published year is required",
        }),
        image: z
            .string({
                required_error: "Image is required",
            })
            .url(),
    }),
});

export const updateBookZodValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        genre: z.enum([...bookGenres] as [string, ...string[]]).optional(),
        publishedAt: z.string().optional(),
        image: z.string().url().optional(),
    }),
});
export const addReviewZodValidationSchema = z.object({
    body: z.object({
        user: z.string(),
        review: z.string(),
    }),
});
