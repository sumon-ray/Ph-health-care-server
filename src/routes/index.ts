import express from "express";
import { adminRouter } from "../app/modules/Admin/admin.routes";
import { authRoutes } from "../app/modules/Auth/Auth.routes";
import { userRoutes } from "../app/modules/user.routes";
import { specialitiesRouter } from "../app/modules/Specialities/specialities.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
