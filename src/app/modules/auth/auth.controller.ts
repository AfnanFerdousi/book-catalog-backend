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
    const user = await authService.addToWishListInDB(req.params.id, req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: user,
        message: "successfully added to wishlist 😎",
    });
});

const getWishList = catchAsync(async (req, res, next) => {
    const userWishList = await authService.getWishListFromDB(req.params.id);
    console.log(userWishList)
    if (userWishList === null) {
        // Handle the case where the user is not found
        sendResponse<IBook[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            data: [],
            message: "User not found or has an empty wishlist.",
        });
    } else if (!userWishList) {
        // Handle the case where the user has an empty wishlist
        sendResponse<IBook[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            data: [],
            message: "User has an empty wishlist.",
        });
    } else {
        // User has items in the wishlist
        sendResponse<IBook[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            data: userWishList,
            message: "Successfully retrieved wishlist 😎",
        });
    }
});


export default {
    createUser,
    loginUser,
    refreshToken,
    addToWishList,
    getWishList,
};
