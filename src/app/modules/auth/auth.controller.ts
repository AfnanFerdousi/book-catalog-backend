import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IUser } from "./auth.interface";
import authService from "./auth.service";
import config from "../../../config/config";
import { IBook } from "../books/book.interface";

const createUser = catchAsync(async (req, res, next) => {
    const user = await authService.createUserInDB(req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        data: user,
        message: "successfully created user 😎",
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await authService.loginUserInDB(loginData);
    const cookieOptions = {
        secure: config.env === "production" ? true : false,
        httpOnly: true,
    };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    if ("refreshToken" in result) {
        delete result.refreshToken;
    }

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully 😎",
        data: result,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshTokenService(refreshToken);
    const cookieOptions = {
        secure: config.env === "production" ? true : false,
        httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Refresh token 😎",
        data: result,
    });
});

const addToWishList = catchAsync(async (req, res, next) => {
    const user = await authService.addToWishListInDB(req.params.id, req.body.book);
  
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: user,
        message: "successfully added to wishlist 😎",
    });
});
const getSingleUser = catchAsync(async (req, res, next) => {
    const user = await authService.getSingleUserFromDB(req.params?.id);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: user,
        message: "successfully retrieved user 😎",
    });
})
const getWishList = catchAsync(async (req, res, next) => {
    const userWishList = await authService.getWishListFromDB(req.params.id);

    if (!userWishList) {
        sendResponse<IBook[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            data: [], // Return an empty array if the user has an empty wishlist
            message: "User has an empty wishlist.",
        });
    } else { // Assuming wishList is an array of IBook objects in IUser interface

        sendResponse<IBook[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            data: userWishList,
            message: "Successfully retrieved wishlist 😎",
        });
    }
});

const removeWishList = catchAsync(async (req, res, next) => {
    const user = await authService.removeFromWishListInDB(req.params.id, req.body.bookId);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: user,
        message: "successfully removed from wishlist 😎",
    });
})

export default {
    createUser,
    loginUser,
    refreshToken,
    addToWishList,
    getWishList,
    getSingleUser,
    removeWishList
};
