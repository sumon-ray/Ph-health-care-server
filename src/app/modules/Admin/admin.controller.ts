import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";


const getAdmin = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["page", "limit", "sortBy","sortOrder" ])
    // console.log(options)
    const result = await adminService.getAdminsFromDB(filter, options);
    res.status(200).json({
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

const getAdminById = async(req:Request,res:Response)=>{
 const {id} = req.params

 const result = await adminService.getAdminById(id)
 try {
  res.status(200).json({
    success: true,
    message: "admin fetched successfully",
    data: result
  })
 } catch (error:any) {
res.status(500).json({
  success: false,
  message: error.name || "not found admin by id",
  error: error
})

 }
}

export const adminController = {
  getAdmin,
  getAdminById 
};
