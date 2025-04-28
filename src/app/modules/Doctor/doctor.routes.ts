import express from "express";
import { doctorController } from "./doctor.controller";

const router = express.Router();

router.patch("/", doctorController.updateDoctor);

export const doctorRouter = router;
