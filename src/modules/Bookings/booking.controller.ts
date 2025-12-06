import { Request, Response } from "express";

//? ================================Create booking ==========================================================
const createBooking = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//? ================================Get booking ==========================================================
const getBooking = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//? ================================Update booking ==========================================================
const updateBooking = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking,
};
