import express, { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

//? ================================= Get all vehicles ================================
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res
      .status(200)
      .json({
        success: true,
        message: "vehicle data is fetched",
        data: result.rows,
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
//? ================================= Create a vehicle ================================
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res
      .status(201)
      .json({ success: true, message: "Vehicle created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

//? ================================ Get single vehicle ================================
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
//? ================================ Update a vehicle ================================
const updateVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
// ? ================================ Delete a vehicle ================================
const deleteVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const vehicleControllers = {
  getAllVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
