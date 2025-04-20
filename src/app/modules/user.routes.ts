import express from "express";
import auth from "../middleware.ts/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", auth("ADMIN", " SUPER_ADMIN"), userController.createAdmin);

export const userRoutes = router;
