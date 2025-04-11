import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();
const createAdmin = async (data: any) => {
    console.log({data}) 
  const userData = {
    email: data.admin.email,
    password: data.password,
    role: UserRole.ADMIN,
  };

  // avabe dileo hbe 
//   const adminData = {
//     name: data.admin.name,
//     email: data.admin.email,
//     contactNumber: data.admin.contactNumber
//   }
  const result = await prisma.$transaction(async (tx) => {
    const createdUserData = await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });
  // const adminData ={
  //     name: data.admin.name,
  //     email: data.admin.email,
  //     contactNumber: data.admin.contactNumber
  // }
  // console.log({data})
  return result;
};

export const userService = {
  createAdmin,
};
