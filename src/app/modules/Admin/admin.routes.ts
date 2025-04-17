import express from "express";
import validateRequest from "../../middleware.ts/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";
const router = express.Router();

router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getAdminById);
router.patch("/:id", validateRequest(adminValidationSchema.update), adminController.updateAdmin);
router.delete("/:id", adminController.deleteUser);
router.delete("/soft/:id", adminController.softDeleteFromDB);
export const adminRouter = router;
