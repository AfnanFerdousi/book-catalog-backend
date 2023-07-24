"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = __importDefault(require("./auth.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const book_model_1 = __importDefault(require("../books/book.model"));
const createUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = auth_model_1.default.create(payload);
    return user;
});
const loginUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_model_1.default.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found 😥");
    }
    else if (isUserExist.password &&
        !(yield auth_model_1.default.isPasswordMatched(payload.password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password is incorrect 😫");
    }
    const { _id, email } = isUserExist;
    const accessToken = (0, jwtHelpers_1.createToken)({
        _id,
        email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)({ _id, email }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.jwt_refresh_secret);
    }
    catch (e) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token 😐");
    }
    const { _id } = verifiedToken;
    const user = yield auth_model_1.default.isUserExist(_id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist 🙄");
    }
    const newAccessToken = (0, jwtHelpers_1.createToken)({ _id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken
    };
});
const addToWishListInDB = (_id, book) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = book._id;
    const isExist = yield auth_model_1.default.findById(_id).exec();
    const isBookExist = yield book_model_1.default.findById(bookId).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found 🙁");
    }
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found 🙁");
    }
    const result = yield auth_model_1.default.findOneAndUpdate({ _id }, {
        $push: { wishList: book },
    }, {
        new: true,
    }).exec();
    return result;
});
const getSingleUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.findOne({ email }).exec();
    if (!result) {
        // If the user is not found, return null
        return null;
    }
    return result;
});
const getWishListFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.findById(_id).exec();
    if (!result) {
        // If the user is not found, return null
        return null;
    }
    return result; // Return the entire IUser object instead of just the wishList
});
const removeFromWishListInDB = (_id, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("bookid--------", bookId);
    const result = yield auth_model_1.default.findOneAndUpdate({ _id }, {
        $pull: { wishList: _id },
    }, {
        new: true,
    }).exec();
    // console.log("result----------", result);
    return result;
});
exports.default = {
    createUserInDB,
    loginUserInDB,
    refreshTokenService,
    addToWishListInDB,
    getWishListFromDB,
    getSingleUserFromDB,
    removeFromWishListInDB,
};
