import express from "express";
import { authControllers } from "./auth.controller";
import { userControllers } from "../Users/user.controller";

const router = express.Router();

router.post("/api/v1/auth/signup", userControllers.createUser);
router.post("/api/v1/auth/signin", authControllers.loginUser);
export const authRoute = router;
