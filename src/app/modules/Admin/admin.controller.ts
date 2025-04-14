import { Request, Response } from "express";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { adminFilterableField } from "./admin.constant";
import { adminService } from "./admin.service";

const getAdmin = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "faild",
      error: error,
    });
  }
};

// getAdminById

const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getAdminById(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "admin fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "not found admin by id",
      error: error,
    });
  }
};

// update admin

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const info = req.body;
    // console.log(id)
    // console.log(info)
    const result = await adminService.updateAdmin(id, info);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "admin updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "failed to update admin info",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "failed to delete admin info",
      error: error,
    });
  }
};
// soft delete
const softDeleteFromDB = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "failed to delete admin info",
      error: error,
    });
  }
};
// delete admin data
export const adminController = {
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteUser,
  softDeleteFromDB,
};
