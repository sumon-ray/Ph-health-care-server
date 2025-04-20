import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// const createToken = (
//   payload: object,
//   secret: Secret,
//   expiresIn: string | number
// ): string => {
//   const options: SignOptions = {
//     algorithm: "HS256",
//     expiresIn: expiresIn as any,
//   };
//   return jwt.sign(payload, secret, options);
// };

// export const jwtHelpers = {
//   createToken,
// };

const createToken = (payload: any, secret: Secret, expiresIn: any) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, secret:Secret)=>{
    return jwt.verify(token,secret) as JwtPayload
}

export const jwtHelpers = {
  createToken,
  verifyToken
};
