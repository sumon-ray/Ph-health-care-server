import express, { NextFunction, Request, Response } from "express";
import { fileUploads } from "../../../helpers/fileUploader";
import { specialitiesController } from "./specialities.controller";
import { specialities } from "./specialities.validation";
const router = express.Router();

router.post(
  "/",
  fileUploads.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = specialities.create.parse(JSON.parse(req.body.data));
    return specialitiesController.insertIntoDB(req, res, next);
  }
);

router.get('/', specialitiesController.getSpecialitiesFromDB)
router.get('/:id', specialitiesController.getSpecialitiesById)

export const specialitiesRouter = router;

// router.post(
//     "/update-my-profile",
//     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//     fileUploads.upload.single("file"),
//     (req: Request, res: Response, next: NextFunction) => {
//       req.body = JSON.parse(req.body.data);
//       return userController.updateMyProfile(req, res, next);
//     }
//   );
