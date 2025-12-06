import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";

const route = express.Router();

route.post("/", userControllers.createUser);
export const userRoute = route;
