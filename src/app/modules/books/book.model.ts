import mongoose, { Schema } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        reviews: {
            type: [
                {
                    user: {
                        type: String,
                        required: true,
                    },
                    review: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
        author: {
            type: String,
            required: true,
        },
        publishedAt: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
    },

    { timestamps: true, versionKey: false }
);

const Books = mongoose.model<IBook, BookModel>("Books", bookSchema);

export default Books;