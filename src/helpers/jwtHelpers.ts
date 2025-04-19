import jwt, { Secret, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: string | number
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as any,
  };
  return jwt.sign(payload, secret, options);
};

export const jwtHelpers = {
  createToken,
};
