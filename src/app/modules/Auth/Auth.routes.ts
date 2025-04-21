import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middleware.ts/auth";
import { authControlller } from "./auth.controller";
const router = express.Router();

router.post("/login", authControlller.loginUser);
router.post("/refreshToken", authControlller.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN),
  authControlller.passwordChange
);

export const authRoutes = router;
