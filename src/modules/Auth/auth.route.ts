import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/api/v1/auth/signup", authControllers.loginUser);
router.post("/api/v1/auth/signin", authControllers.loginUser);
export const authRoute = router;
