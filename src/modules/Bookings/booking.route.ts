import express from "express";
import { bookingController } from "./booking.controller";

const route = express.Router();

route.post("/api/v1/bookings", bookingController.createBooking);
route.get("/api/v1/bookings", bookingController.getBooking);
route.put("/api/v1/bookings/:bookingId", bookingController.updateBooking);

export const bookingRoute = route;
