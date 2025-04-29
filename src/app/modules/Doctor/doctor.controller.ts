import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { doctorService } from "./doctor.service";

const getAllDoctorFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getAllDoctorFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "doctor fetched successfully",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await doctorService.updateDoctor(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "doctor updated successfully",
    data: result,
  });
});

export const doctorController = {
  getAllDoctorFromDB,
  updateDoctor,
};
