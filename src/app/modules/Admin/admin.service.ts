import { Prisma } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelper";
import { adminSearchableField } from "./admin.constant";
import prisma from "../../../shared/prisma";

const getAdminsFromDB = async (params: any, options: any) => {
  const { page, limit, skip } = calculatePagination(options);
  // console.log(options)
  const { searchTerm, ...filteredData } = await params;
  // console.log({ filteredData });
  const andConditions: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // specific fields er upor filtering
  if (Object.keys(filteredData).length > 0) {
    andConditions.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key.trim()]: {
          equals: filteredData[key],
        },
      })),
    });
  }
  // bad practice dekhe rakhbo sudhu
  //
  // [
  //   {
  //     name: {
  //       contains: params.searchTerm,
  //       mode: "insensitive",
  //     },
  //   },
  //   {
  //     email: {
  //       contains: params.searchTerm,
  //       mode: "insensitive",
  //     },
  //   },
  // ],

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });
  return result;
};

export const adminService = {
  getAdminsFromDB,
};
