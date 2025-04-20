import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middleware.ts/auth";
import validateRequest from "../../middleware.ts/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAdmin
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.getAdminById
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationSchema.update),
  adminController.updateAdmin
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.deleteUser
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminController.softDeleteFromDB
);
export const adminRouter = router;
