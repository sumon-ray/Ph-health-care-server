import express from "express";
import { adminRouter } from "../app/modules/Admin/admin.routes";
import { userRoutes } from "../app/modules/user.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
