import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { userFilterableField } from "./user.constant";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "invalid",
      error: error,
    });
  }
};

const createDoctor = async (req: Request, res: Response) => {
  try {
    const result = await userService.createDoctor(req);
    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "invalid",
      error: error,
    });
  }
};

//
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, userFilterableField);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  // console.log(options)
  const result = await userService.getAllFromDB(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all users fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  getAllFromDB
};
