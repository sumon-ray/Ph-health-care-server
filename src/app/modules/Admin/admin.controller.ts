import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAdmin = async (req: Request, res: Response) => {

  const result = await adminService.getAdminsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "all admin",
    data: result,
  });
};

export const adminController = {
  getAdmin,
};
