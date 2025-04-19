import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../shared/prisma";
const loginUser = async (data: { email: string; password: string }) => {
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

  const accessToken = jwt.sign(
    {
      email: result.email,
      password: result.password,
      role: result.role,
    },
    "017239168822@sumon",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );
  const refreshToken = jwt.sign(
    {
      email: result.email,
      password: result.password,
      role: result.role,
    },
    "01763604565@sumon",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: result.needPasswordChange,
  };
};

export const authService = {
  loginUser,
};
