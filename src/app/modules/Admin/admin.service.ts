import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAdminsFromDB = async (params: any) => {
  const { searchTerm, ...filteredData } = await params;
  // console.log({ filteredData });
  const andConditions: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: ["name", "email"].map((field) => ({
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
  });
  return result;
};

export const adminService = {
  getAdminsFromDB,
};
