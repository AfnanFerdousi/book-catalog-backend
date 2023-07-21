import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interface";
import authService from "./auth.service";

const createUser = catchAsync(async (req, res, next) => {
    const user = await authService.createUserInDB(req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        data: user,
        message: "successfully created user 😎"
    })
})

export default {
    createUser
}