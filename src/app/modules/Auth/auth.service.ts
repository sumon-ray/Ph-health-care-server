import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { validateEnv } from "../../../helpers/validateEnv";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/apiError";
import emailSender from "./emailSender";
const loginUser = async (data: { email: string; password: string }) => {
  validateEnv();

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    data.password,
    result.password
  );
  if (!isCorrectPassword) {
    throw new Error("password did not matched");
  }
  //   console.log(isCorrectPassword);

  //   const createToken = (
  //     payload: object,
  //     secret: Secret,
  //     expiresIn: string | number
  //   ): string => {
  //     const options: SignOptions = {
  //       algorithm: "HS256",
  //       expiresIn: expiresIn as any,
  //     };
  //     return jwt.sign(payload, secret, options);
  //   };
  //   if (
  //     !process.env.ACCESS_TOKEN_SECRET ||
  //     !process.env.REFRESH_TOKEN_SECRET ||
  //     !process.env.ACCESS_TOKEN_EXPIRES_IN ||
  //     !process.env.REFRESH_TOKEN_EXPIRES_IN
  //   ) {
  //     throw new Error("JWT credentials are missing in environment variables.");
  //   }

  const accessToken = jwtHelpers.createToken(
    { email: result.email, role: result.role },
    config.jwt.ACCESS_TOKEN_SECRET as string,
    config.jwt.ACCESS_TOKEN_EXPIRES_IN as string
  );
  const refreshToken = jwtHelpers.createToken(
    { email: result.email, role: result.role },
    config.jwt.REFRESH_TOKEN_SECRET as string,
    config.jwt.REFRESH_TOKEN_EXPIRES_IN as string
  );

  //   const accessToken = jwt.sign(
  //     {
  //       email: result.email,
  //       role: result.role,
  //     },
  //     "017239168822@sumon",
  //     {
  //       algorithm: "HS256",
  //       expiresIn: "5m",
  //     }
  //   );
  //   const refreshToken = jwt.sign(
  //     {
  //       email: result.email,
  //       role: result.role,
  //     },
  //     "01763604565@sumon",
  //     {
  //       algorithm: "HS256",
  //       expiresIn: "30d",
  //     }
  //   );

  //   console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: result.needPasswordChange,
  };
};

// refreshToken

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      `${config.jwt.REFRESH_TOKEN_SECRET}`
    );
    // console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.createToken(
    { email: userData.email, role: userData.role },
    config.jwt.ACCESS_TOKEN_SECRET as string,
    config.jwt.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

// password change
const passwordChange = async (user: any, payload: any) => {
  // console.log(object)
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect");
  }

  const hashPassword = await bcrypt.hash(payload.newPassword, 12);
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });
  return {
    message: "Password changed successfully",
  };
};

// forgot password
const forgotPassword = async (payload: { email: string }) => {
  // console.log(payload)

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  //   console.log(result);
  // token generate
  const resetPassToken = jwtHelpers.createToken(
    { email: userData.email, role: userData.role },
    config.RESET_PASSWORD_SECRET as Secret,
    config.RESET_PASSWORD_TOKEN_EXP_IN as string
  );
  //   console.log(resetPassToken);
  // reset password link
  const resetPassLink =
    config.RESET_PASSWORD_LINK +
    `?userId=${userData.id}&token=${resetPassToken}`;
  console.log(resetPassLink);
  await emailSender(
    userData.email,

    `<div>
    <p> Dear User,</p>
    <p> Your password reset Link 
         <a href=${resetPassLink}>
         <button>
         Reset Password
         <button>
              </a>
    </p>
    </div>
    `
  );
};

// reset-password
const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  //   console.log(token, payload);

  try {
    const isValidToken = jwtHelpers.verifyToken(
      token,
      config.RESET_PASSWORD_SECRET as Secret
    );
    if (!isValidToken) {
      throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
    }
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  // update into database
};

export const authService = {
  loginUser,
  refreshToken,
  passwordChange,
  forgotPassword,
  resetPassword,
};
