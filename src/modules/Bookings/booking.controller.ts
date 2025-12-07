import { Request, Response } from "express";
import { bookingService } from "./booking.service";

//? ================================Create booking ==========================================================
const createBooking = async (req: Request, res: Response) => {
  const payload = req.body;
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price: number,
  } = req.body;

  try {
    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (rent_end_date < rent_start_date) {
      res.status(400).json({ message: "End date must be after start date" });
      return;
    }
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
    const result = await bookingService.getBooking();
    return res.json({ success: true, message: "Bookings retrieved successfully", data: result });
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
