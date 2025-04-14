import { Admin, Prisma, UserStatus } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchableField } from "./admin.constant";

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

  andConditions.push({
    isDeleted: false,
  });
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
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// getAdminById

const getAdminById = async (id: string): Promise<Admin | null> => {
  // console.log(id)
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
      isDeleted: false,
    },
  });
  return result;
};

// update admin data
const updateAdmin = async (id: string, info: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data: info,
  });
  return result;
};

// delete admin
const deleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    const deleteAdmin = await tx.admin.delete({
      where: {
        id,
      },
    });

    await tx.user.delete({
      where: {
        email: deleteAdmin.email,
      },
    });
    return deleteAdmin;
  });

  return result;
};

const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.$transaction(async (tx) => {
    const deleteAdmin = await tx.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await tx.user.update({
      where: {
        email: deleteAdmin.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return deleteAdmin;
  });
  return result;
};

export const adminService = {
  getAdminsFromDB,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteFromDB,
};
