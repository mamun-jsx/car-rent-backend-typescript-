import express from "express";
import { userControllers } from "./user.controller";
import auth from "../Auth/auth";

const route = express.Router();
//*_____  /user/api/v1/auth/signin
route.post("/api/v1/auth/signup", userControllers.createUser);
route.get("/api/v1/users", auth(), userControllers.getUser);
route.put("/api/v1/users/:userId", userControllers.updateUser);
route.delete("/api/v1/users/:userId", userControllers.deleteUser);
export const userRoute = route;
