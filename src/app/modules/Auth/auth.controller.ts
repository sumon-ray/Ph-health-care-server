import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
const {refreshToken} = result

 res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true
 })
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logged in user successfully",
    data: {
        accessToken:  result.accessToken,
        needPasswordChange: result.needPasswordChange
    },
  });
});

export const authControlller = {
  loginUser,
};
