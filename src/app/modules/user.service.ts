import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import { fileUploads } from "../../helpers/fileUploader";
const createAdmin = async (req: any) => {
  // console.log(req.file)
  // console.log(req.body.data)

  if (req.file) {
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(req.file)
    console.log("uploaded=>",uploadToCloudinary)
  }

  // const hashPassword = await bcrypt.hash(data.password, 12);
  // const userData = {
  //   email: data.admin.email,
  //   password: hashPassword,
  //   role: UserRole.ADMIN,
  // };

  // // avabe dileo hbe

  // //   const adminData = {
  // //     name: data.admin.name,
  // //     email: data.admin.email,
  // //     contactNumber: data.admin.contactNumber
  // //   }
  // const result = await prisma.$transaction(async (tx) => {
  //   await tx.user.create({
  //     data: userData,
  //   });

  //   const createdAdminData = await tx.admin.create({
  //     data: data.admin,
  //   });
  //   return createdAdminData;
  // });
  // // const adminData ={
  // //     name: data.admin.name,
  // //     email: data.admin.email,
  // //     contactNumber: data.admin.contactNumber
  // // }
  // // console.log({data})
  // return result;
};

export const userService = {
  createAdmin,
};


