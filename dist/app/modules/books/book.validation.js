"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewZodValidationSchema = exports.updateBookZodValidationSchema = exports.createBookZodValidationSchema = void 0;
const zod_1 = require("zod");
const book_constant_1 = require("./book.constant");
exports.createBookZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        author: zod_1.z.string({
            required_error: "Author is required",
        }),
        genre: zod_1.z.enum([...book_constant_1.bookGenres], {
            required_error: "Genre is required",
        }),
        publishedAt: zod_1.z.string({
            required_error: "Published year is required",
        }),
        image: zod_1.z
            .string({
            required_error: "Image is required",
        })
            .url(),
    }),
});
exports.updateBookZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.enum([...book_constant_1.bookGenres]).optional(),
        publishedAt: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
    }),
});
exports.addReviewZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string(),
        review: zod_1.z.string(),
    }),
});
