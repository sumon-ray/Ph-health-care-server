import express from "express";
import { doctorController } from "./doctor.controller";
import { fileUploads } from "../../../helpers/fileUploader";

const router = express.Router();

router.get("/", doctorController.getAllDoctorFromDB);
router.patch("/:id",fileUploads.upload.single("file"), doctorController.updateDoctor);

export const doctorRouter = router;
