import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";

// get all doctor
const getAllDoctorFromDB = async () => {
  const result = await prisma.doctor.findMany();
  return result;
};
// update admin data
const updateDoctor = async (id: string, data: any): Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.doctor.update({
    where: {
      id,
    },
    data: data
  });
  return result;
};

export const doctorService = {
  getAllDoctorFromDB,
  updateDoctor,
};
