import express from "express";
import { vehicleControllers } from "./vehicles.controller";
const route = express.Router();

route.post("/api/v1/vehicles", vehicleControllers.createVehicle);
route.get("/api/v1/vehicles", vehicleControllers.getAllVehicles);
route.get("/api/v1/vehicles/:vehicleId", vehicleControllers.getSingleVehicle);
route.put("/api/v1/vehicles/:vehicleId", vehicleControllers.updateVehicle);
route.delete("/api/v1/vehicles/:vehicleId", vehicleControllers.deleteVehicle);

export const vehicleRoute = route;

