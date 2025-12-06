import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";

const route = express.Router();
//*_____  /user/api/v1/auth/signin
route.post("/api/v1/auth/signup", userControllers.createUser);
route.get("/api/v1/users", userControllers.getUser);
export const userRoute = route;
