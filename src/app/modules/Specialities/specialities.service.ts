import { Specialities } from "@prisma/client";
import { Request } from "express";
import { fileUploads } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";

// create Specialities
const insertIntoDB = async (req: Request) => {
  // console.log(req.body)
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};

//get specialities
const getSpecialitiesFromDB = async () => {
  const result = await prisma.specialities.findMany();
  return result;
};

//get specialities by Id
const getSpecialitiesById = async (id:string):Promise<Specialities | null> => {
  const result = await prisma.specialities.findUniqueOrThrow({
    where: {
        id
    }
  });
  return result;
};

export const specialitiesService = {
  insertIntoDB,
  getSpecialitiesFromDB,
  getSpecialitiesById
};
