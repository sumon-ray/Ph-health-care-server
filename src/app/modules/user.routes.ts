import { UserRole } from "@prisma/client";
import express from "express";
import { fileUploads } from "../../helpers/fileUploader";
import auth from "../middleware.ts/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/",
  fileUploads.upload.single("file"),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
