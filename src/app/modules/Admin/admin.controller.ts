import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";


const getAdmin = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);
    const result = await adminService.getAdminsFromDB(filter);
    res.status(200).json({
      success: true,
      message: "all admin",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "faild",
      error: error,
    });
  }
};

export const adminController = {
  getAdmin,
};
