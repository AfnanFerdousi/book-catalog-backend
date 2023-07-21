import mongoose from "mongoose";
import { IBook } from "../books/book.interface";

export type IUser = {
    email: string;
    password: string;
    wishList: IBook[];
    _id: mongoose.Schema.Types.ObjectId;
};

export type UserModel = {
    isUserExist(
        email: string
    ): Promise<Pick<IUser, "_id"> | "email" | "password" | null>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
} & mongoose.Model<IUser>;

export type ILoginUser = {
    email: string;
    password: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};