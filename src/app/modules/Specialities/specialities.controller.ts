import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialitiesService } from "./specialities.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body)
  const result = await specialitiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "specialties created successfully",
    data: result,
  });
});

export const specialitiesController = {
  insertIntoDB,
};
