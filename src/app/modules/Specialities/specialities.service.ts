import { Request } from "express";
import { fileUploads } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (req:Request) => {
    console.log(req.body)
  const file = req.file ;
  if (file) {
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};

export const specialitiesService = {
  insertIntoDB,
};
