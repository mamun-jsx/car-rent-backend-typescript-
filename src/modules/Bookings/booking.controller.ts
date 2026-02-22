import { Request, Response } from "express";
import { bookingService } from "./booking.service";

//? ================================Create booking ==========================================================
const createBooking = async (req: Request, res: Response) => {
  const { vehicle_id, rent_start_date, rent_end_date } = req.body;
  const customer_id = (req.user as any).id; // assuming id in token

  try {
    if (!vehicle_id || !rent_start_date || !rent_end_date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);
    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ success: false, message: "End date must be after start date" });
    }

    const result = await bookingService.createBooking({
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
    });
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message.includes("not available")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
//? ================================Get booking ==========================================================
const getBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const result = await bookingService.getBooking(user.role, user.id);
    return res.json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerBookings = async (req: Request, res: Response) => {};

//? ================================Update booking ==========================================================
const updateBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const user = req.user as any;

  if (!bookingId) {
    return res
      .status(400)
      .json({ success: false, message: "Booking ID is required" });
  }
  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status is required" });
  }

  try {
    const result = await bookingService.updateBooking(bookingId, status, user);
    return res.json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("cancel") || error.message.includes("only")) {
      return res.status(403).json({ success: false, message: error.message });
    }
    if (error.message.includes("Unauthorized")) {
      return res.status(403).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking,
  getCustomerBookings,
};
