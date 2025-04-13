import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAdmin);
router.get("/:id", adminController.getAdminById);
export const adminRouter = router;
