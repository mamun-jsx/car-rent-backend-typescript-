import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";

const route = express.Router();
//*_____  /user/api/v1/auth/signin
route.post("/api/v1/auth/signup", userControllers.createUser);
route.get("/api/v1/users", userControllers.getUser);
route.put("/api/v1/users/:userId", userControllers.updateUser);
export const userRoute = route;