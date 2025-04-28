import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";

// update admin data
const updateDoctor = async (id: string, data:any):Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.doctor.update({
    where: {
      id,
    },
    data: data,
  });
  return result;
};

export const doctorService = {
  updateDoctor,
};
