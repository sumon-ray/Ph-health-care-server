import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialitiesService } from "./specialities.service";

// create Specialities
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await specialitiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "specialties created successfully",
    data: result,
  });
});

// getSpecialitiesFromDB
const getSpecialitiesFromDB = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.body)
    const result = await specialitiesService.getSpecialitiesFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "fetched specialties successfully",
      data: result,
    });
  }
);
// getSpecialitiesById
const getSpecialitiesById = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body)
  const { id } = req.params;
  const result = await specialitiesService.getSpecialitiesById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "fetched single specialties successfully",
    data: result,
  });
});

export const specialitiesController = {
  insertIntoDB,
  getSpecialitiesFromDB,
  getSpecialitiesById,
};
