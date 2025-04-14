import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getAdminById);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteUser);
router.delete("/soft/:id", adminController.softDeleteFromDB);
export const adminRouter = router;
