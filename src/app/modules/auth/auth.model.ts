import mongoose from "mongoose";
import { IUser, UserModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";

const userSchema = new mongoose.Schema<IUser, UserModel>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        wishList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Books",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

userSchema.statics.isUserExist = async function (
    _id: string
): Promise<Pick<IUser, "_id" | "email" | "password"> | null> {
    return await User.findById(_id, { email: 1, password: 1 }).exec();
};

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
