import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";

// get all doctor
const getAllDoctorFromDB = async () => {
  const result = await prisma.doctor.findMany();
  return result;
};
// update admin data
const updateDoctor = async (id: string, data: any): Promise<Doctor | null> => {
  const { specialities, ...doctorData } = data;
  console.log(specialities, doctorData);
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const updateDoctor = await tx.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialities: true,
      },
    });

    for (const specialitiesId of specialities) {
      const createSpecialities = await tx.doctorSpecialities.create({
        data: {
          doctorId: doctorInfo.id,
          specialitiesId: specialitiesId,
        },
      });
    }
    return updateDoctor
  });
  return result
};

export const doctorService = {
  getAllDoctorFromDB,
  updateDoctor,
};
