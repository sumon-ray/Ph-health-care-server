import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logged in user successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token generated successfully",
    data: result,
  });
});
//
const passwordChange = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const user = req.user;
  const result = await authService.passwordChange(user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "password changed successfully",
    data: result,
  });
});
export const authControlller = {
  loginUser,
  refreshToken,
  passwordChange,
};
