import { PrismaClient } from "@prisma/client";
import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", adminController.getAdmin);
export const adminRouter = router;
