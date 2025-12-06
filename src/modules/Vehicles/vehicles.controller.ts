import express, { Request, Response } from "express";

const getAllVehicles = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

const createVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
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
