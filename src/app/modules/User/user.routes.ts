import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploads } from "../../../helpers/fileUploader";
import auth from "../../middleware.ts/auth";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.get("/", userController.getAllFromDB);
router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userController.getMyProfile
);

router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.changeProfileStatus
);

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploads.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res);
  }
);
router.post(
  "/create-doctor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploads.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
    return userController.createDoctor(req, res);
  }
);

router.post(
  "/create-patient",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.PATIENT),
  fileUploads.upload.single("file"),
  (req: Request, res: Response) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      return userController.createPatient(req, res);
    } catch (error) {
      console.error("Error parsing body", error);
      res.status(400).json({
        success: false,
        message: "Invalid body format",
      });
    }
  }
);

router.post(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  fileUploads.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;
