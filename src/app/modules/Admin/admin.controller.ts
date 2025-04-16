import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableField } from "./admin.constant";
import { adminService } from "./admin.service";

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, adminFilterableField);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  // console.log(options)
  const result = await adminService.getAdminsFromDB(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all admin",
    meta: result.meta,
    data: result.data,
  });
});

// getAdminById

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getAdminById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin fetched successfully",
    data: result,
  });
});

// update admin

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const info = req.body;
  // console.log(info)
  const result = await adminService.updateAdmin(id, info);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id)
  // console.log(info)
  const result = await adminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin deleted successfully",
    data: result,
  });
});
// soft delete
const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id)
  // console.log(info)
  const result = await adminService.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin deleted successfully",
    data: result,
  });
});
// delete admin data
export const adminController = {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteUser,
  softDeleteFromDB,
};


