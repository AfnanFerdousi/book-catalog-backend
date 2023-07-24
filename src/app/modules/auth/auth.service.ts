import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
    ILoginUserResponse,
    IRefreshTokenResponse,
    IUser,
} from "./auth.interface";
import User from "./auth.model";
import { createToken, verifyToken } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";
import Books from "../books/book.model";
import { IBook } from "../books/book.interface";

const createUserInDB = async (payload: IUser) => {
    const user = User.create(payload);
    return user;
};

const loginUserInDB = async (payload: IUser): Promise<ILoginUserResponse> => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found 😥");
    } else if (
        isUserExist.password &&
        !(await User.isPasswordMatched(payload.password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is incorrect 😫");
    }

    const { _id, email } = isUserExist;
    const accessToken = createToken(
        {
            _id,
            email,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );
    const refreshToken = createToken(
        { _id, email },
        config.jwt.jwt_refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

const refreshTokenService = async (
    token: string
): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = verifyToken(
            token,
            config.jwt.jwt_refresh_secret as Secret
        );
    } catch (e) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token 😐");
    }

    const { _id } = verifiedToken;
    const user = await User.isUserExist(_id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist 🙄");
    }

    const newAccessToken = createToken(
        { _id: user?._id, email: user?.email },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken
    };
};

const addToWishListInDB = async (
    _id: string,
    book: IBook
) => {
   
    const bookId = book._id;
    const isExist = await User.findById(_id).exec();
    const isBookExist = await Books.findById(bookId).exec();
  if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found 🙁");
    }
    if (!isBookExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book not found 🙁");        
    }
  const result = await User.findOneAndUpdate(
      { _id },
      {
          $push: { wishList: bookId },
      },
      {
          new: true,
      }
  ).exec();
  return result;
}
const getSingleUserFromDB = async (email: string): Promise<IUser | null> => {
    const result = await User.findOne({ email }).exec();
    if (!result) {
        // If the user is not found, return null
        return null;
    }
    return result;
}
const getWishListFromDB = async (_id: string) => {
    const result = await User.findById(_id).select("wishList").populate("wishList").exec();
    if (!result) {
        // If the user is not found, return null
        return null;
    }

    return result; // Return the entire IUser object instead of just the wishList
};
const removeFromWishListInDB = async (_id: string, bookId: string) => {
    console.log("bookid--------",bookId)
    const result = await User.findOneAndUpdate(
        { _id },
        {
            $pull: { wishList: bookId },
        },
        {
            new: true,
        }
    ).exec();
    // console.log("result----------", result);
    return result;
};

export default {
    createUserInDB,
    loginUserInDB,
    refreshTokenService,
    addToWishListInDB,
    getWishListFromDB,
    getSingleUserFromDB,
    removeFromWishListInDB,
};
