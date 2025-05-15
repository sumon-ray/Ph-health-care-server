import { Prisma } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPatientFilterRequest } from "./patient.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { patientSearchableFields } from "./patient.constants";

const getAllFromDB = async (
    filters: IPatientFilterRequest,
    options: IPaginationOptions,
  ) => {
    const { limit, page, skip } = calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: patientSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }),
      });
    }
    andConditions.push({
      isDeleted: false,
    });
  
    const whereConditions: Prisma.PatientWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.patient.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
            createdAt: 'desc',
          },
      include: {
        medicalReport: true,
        patientHealthData: true,
      }
    });
    const total = await prisma.patient.count({
      where: whereConditions,
    });
  
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  };

 export const PatientService = {
    getAllFromDB
  }