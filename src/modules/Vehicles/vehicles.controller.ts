import express, { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

//? ================================= Get all vehicles ================================
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res.status(200).json({
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

//? ================================ Get single vehicle ===============================
const getSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  const result = await vehicleServices.getSingleVehicle(
    vehicleId as string | number
  );
  res.status(200).json({
    success: true,
    message: "vehicle details fetched",
    data: result.rows[0],
  });
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

//? ================================ Update a vehicle =================================
const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  const payload = req.body;
  try {
    const result = await vehicleServices.updateVehicle(
      payload,
      vehicleId as string | number
    );
    res.status(200).json({
      success: true,
      message: "vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
// ? ================================ Delete a vehicle ================================
const deleteVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehicleServices.deleteVehicle(
      vehicleId as string | number
    );
    res.status(200).json({
      success: true,
      message: "vehicle deleted successfully",
      data: result.rows[0],
    });
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
