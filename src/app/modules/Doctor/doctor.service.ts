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

  await prisma.$transaction(async (tx) => {
    const updateDoctor = await tx.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialities: true,
      },
    });

    if (specialities && specialities.length) {
      // delete
      const deleteSpecialitiesIds = specialities.filter(
        (speciality) => speciality.isDeleted
      );

      for (const speciality of deleteSpecialitiesIds) {
        await tx.doctorSpecialities.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialitiesId: speciality.specialitiesId,
          },
        });
      }

      // create
      const createSpecialitiesIds = specialities.filter(
        (speciality) => !speciality.isDeleted
      );
      for (const speciality of createSpecialitiesIds) {
        await tx.doctorSpecialities.create({
          data: {
            doctorId: doctorInfo.id,
            specialitiesId: speciality.specialitiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialities: {
        include: {
          specialities: true
        }
      }
    },
  });
  return result;
};

export const doctorService = {
  getAllDoctorFromDB,
  updateDoctor,
};
