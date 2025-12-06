import { Request, Response } from "express";
import { bookingService } from "./booking.service";

//? ================================Create booking ==========================================================
const createBooking = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const result = await bookingService.createBooking(payload);
    res
      .status(201)
      .json({ message: "Booking created successfully", data: result });
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
