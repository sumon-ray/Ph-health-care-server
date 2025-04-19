import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { validateEnv } from "../../../helpers/validateEnv";
const loginUser = async (data: { email: string; password: string }) => {
    validateEnv()
  console.log(data);
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
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
    process.env.ACCESS_TOKEN_SECRET as string,
    process.env.ACCESS_TOKEN_EXPIRES_IN as string
  );
  const refreshToken = jwtHelpers.createToken(
    { email: result.email, role: result.role },
    process.env.REFRESH_TOKEN_SECRET as string,
    process.env.REFRESH_TOKEN_EXPIRES_IN as string
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

export const authService = {
  loginUser,
};
