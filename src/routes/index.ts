import express from "express";
import { adminRouter } from "../app/modules/Admin/admin.routes";
import { authRoutes } from "../app/modules/Auth/Auth.routes";
import { doctorRouter } from "../app/modules/Doctor/doctor.routes";
import { specialitiesRouter } from "../app/modules/Specialities/specialities.routes";
import { userRoutes } from "../app/modules/User/user.routes";
import { patientRoutes } from "../app/modules/Patient/patient.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/admin",
    router: adminRouter,
  },
  {
    path: "/auth",
    router: authRoutes,
  },
  {
    path: "/specialities",
    router: specialitiesRouter,
  },
  {
    path: "/doctor",
    router: doctorRouter,
  },
  {
    path: "/patient",
    router: patientRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
