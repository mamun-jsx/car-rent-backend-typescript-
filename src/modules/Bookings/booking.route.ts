import express from "express";

const route = express.Router();

route.post("/api/v1/bookings");
route.get("/api/v1/bookings	");

route.put("/api/v1/bookings/:bookingId");

export const bookingRoute = route;
