import { Router } from "express";
import { authControllers } from "./auth.controller";
import { userControllers } from "../users/user.controller";
const router = Router();
router.post("/signup", userControllers.createUser);
router.post("/signin", authControllers.loginUser);
export const authRoutes = router;
