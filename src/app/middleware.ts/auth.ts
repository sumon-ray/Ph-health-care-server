import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../errors/apiError";

const auth = (...roles: string[]) => {
  // console.log(roles)
  return async (req: Request & {user?:any}, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      //   console.log(token);
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt.ACCESS_TOKEN_SECRET as Secret
      );
    //   console.log(verifiedUser)

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
