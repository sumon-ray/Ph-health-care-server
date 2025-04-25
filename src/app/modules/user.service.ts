import { Admin, Doctor, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUploads } from "../../helpers/fileUploader";
import prisma from "../../shared/prisma";
import { IFile } from "../interfaces/file";

const createAdmin = async (req: Request): Promise<Admin> => {
  // console.log(req.body);

  if (req.file) {
    const file = req.file as IFile;
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    // console.log("uploaded=>", uploadToCloudinary);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

    //  console.log(req.body)
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  // avabe dileo hbe

  //   const adminData = {
  //     name: data.admin.name,
  //     email: data.admin.email,
  //     contactNumber: data.admin.contactNumber
  //   }
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });
  // const adminData ={
  //     name: data.admin.name,
  //     email: data.admin.email,
  //     contactNumber: data.admin.contactNumber
  // }
  // console.log({data})
  return result;
};

// create doctor

const createDoctor = async (req: Request): Promise<Doctor> => {
  // console.log(req.body);

  if (req.file) {
    const file = req.file as IFile;
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    // console.log("uploaded=>", uploadToCloudinary);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;

    //  console.log(req.body)
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.user.create({
        data: userData,
      });

      const createDoctorData = await tx.doctor.create({
        data: req.body.doctor,
      });
      return createDoctorData;
    }
  );

  return result;
};

export const userService = {
  createAdmin,
  createDoctor,
};
