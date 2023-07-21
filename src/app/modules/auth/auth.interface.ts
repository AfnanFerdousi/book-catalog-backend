import mongoose, { Model } from "mongoose";
import { IBook } from "../books/book.interface";

export type IUser = {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    wishList?: IBook[];
};

// export type UserModel = {
//     isUserExist(
//         email: string
//     ): Promise<Pick<IUser, "_id" | "email" | "password"> | "email" | "password" | "_id"| null>;
//     isPasswordMatched(
//         givenPassword: string,
//         savedPassword: string
//     ): Promise<boolean>;
// } & mongoose.Model<IUser>;

export type UserModel = Model<IUser> & {
    isUserExist(
        email: string
    ): Promise<Pick<IUser, "_id" | "email" | "password"> | null>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
};

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