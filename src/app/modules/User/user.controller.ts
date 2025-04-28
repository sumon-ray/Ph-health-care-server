import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuth } from "../../interfaces/common";
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
const createPatient = async (req: Request, res: Response) => {
  console.log("req", req.body);  // Debugging request body
  try {
    const result = await userService.createPatient(req); // Assume this handles creating the patient
    res.status(200).json({
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  } catch (error: any) {
    // Log error for debugging
    console.error("Error occurred while creating patient:", error);
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

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.changeProfileStatus(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "profile status changed successfully",
    data: result,
  });
});
// get profile
const getMyProfile = catchAsync(
  async (req: Request & { user?: TAuth }, res: Response) => {
    const user = req.user;

    const result = await userService.getMyProfile(user as TAuth);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "profile data fetched successfully",
      data: result,
    });
  }
);

// update profile \

const updateMyProfile = catchAsync(
  async (req: Request & { user?: TAuth }, res: Response) => {
    const user = req.user;

    const result = await userService.updateMyProfile(user as TAuth, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Update profile successfully",
      data: result,
    });
  }
);
export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
