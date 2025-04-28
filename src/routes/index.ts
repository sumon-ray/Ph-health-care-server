import express from "express";
import { adminRouter } from "../app/modules/Admin/admin.routes";
import { authRoutes } from "../app/modules/Auth/Auth.routes";
import { doctorRouter } from "../app/modules/Doctor/doctor.routes";
import { specialitiesRouter } from "../app/modules/Specialities/specialities.routes";
import { userRoutes } from "../app/modules/User/user.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
