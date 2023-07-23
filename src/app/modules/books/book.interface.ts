import mongoose from "mongoose";

export type IGenre =
    | "Action"
    | "Fantasy"
    | "Science Fiction"
    | "Mystery"
    | "Romance"
    | "Historical Fiction"
    | "Horror"
    | "Thriller/Suspense"
    | "Comedy/Humor"
    | "Biography/Autobiography"
    | "Drama"
    | "Young Adult"
    | "Crime/Noir"
    | "Adventure"
    | "Poetry"
    | "Self-help"
    | "Satire"
    | "Western"
    | "Paranormal/Supernatural"
    | "Graphic Novel/Comic"
    | "Education";


export type IReview = {
    review: string;
    user: mongoose.Schema.Types.ObjectId;
};

export type IBook = {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    image: string;
    reviews?: IReview[];
    author: string;
    publishedAt: string;
    genre: IGenre;
}

export type IBookFilters = {
    title?: string;
    author?: string;
    genre?: string;
    publishedAt?: string;
    searchTerm?: string;
};

export type BookModel = mongoose.Model<IBook, string>;