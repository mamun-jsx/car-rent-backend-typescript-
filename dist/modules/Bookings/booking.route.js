import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../Auth/auth";
const route = express.Router();
route.post("/api/v1/bookings", auth("customer", "admin"), bookingController.createBooking);
route.get("/api/v1/bookings", auth("admin", "customer"), bookingController.getBooking);
route.put("/api/v1/bookings/:bookingId", auth("admin", "customer"), bookingController.updateBooking);
export const bookingRoute = route;
