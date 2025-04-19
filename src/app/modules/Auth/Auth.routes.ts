import express from "express";
import { authControlller } from "./auth.controller";
const router = express.Router();

router.post("/login", authControlller.loginUser);

export const authRoutes = router;
