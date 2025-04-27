import { Admin, Doctor, Prisma, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { fileUploads } from "../../helpers/fileUploader";
import calculatePagination from "../../helpers/paginationHelper";
import prisma from "../../shared/prisma";
import { IFile } from "../interfaces/file";
import { IPaginationOptions } from "../interfaces/pagination";
import { userSearchableField } from "./user.constant";

const createAdmin = async (req: Request): Promise<Admin> => {
  // console.log(req.body);

  if (req.file) {
    const file = req.file as IFile;
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    // console.log("uploaded=>", uploadToCloudinary);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

    //  console.log(req.body)
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  // avabe dileo hbe

  //   const adminData = {
  //     name: data.admin.name,
  //     email: data.admin.email,
  //     contactNumber: data.admin.contactNumber
  //   }
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: req.body.admin,
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

// create doctor

const createDoctor = async (req: Request): Promise<Doctor> => {
  // console.log(req.body);

  if (req.file) {
    const file = req.file as IFile;
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    // console.log("uploaded=>", uploadToCloudinary);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;

    //  console.log(req.body)
  }

  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.user.create({
        data: userData,
      });

      const createDoctorData = await tx.doctor.create({
        data: req.body.doctor,
      });
      return createDoctorData;
    }
  );

  return result;
};

//

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  // console.log(options);
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filteredData } = await params;
  // console.log({ filteredData });
  const andConditions: Prisma.UserWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchableField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // andConditions.push({
  //   isDeleted: false,
  // });
  // specific fields er upor filtering
  if (Object.keys(filteredData).length > 0) {
    andConditions.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key.trim()]: {
          equals: (filteredData as any)[key],
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

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };
  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      status: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.user.count({
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

const changeProfileStatus = async (id: string, status: UserRole) => {
  // console.log(id, data)
  await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateUserStatus;
};

// get my profile
const getMyProfile = async (user: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });
  // console.log(userInfo)
  let profileInfo;
  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role == UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }
  return { ...userInfo, ...profileInfo };
};

const updateMyProfile = async (user: any, req: Request) => {
  // console.log(user,data)
  const file = req.file as IFile;
  // profile photo upload
  if (file) {
    const uploadToCloudinary = await fileUploads.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  let profileInfo;
  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

export const userService = {
  createAdmin,
  createDoctor,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
