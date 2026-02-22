import express from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
// parser
app.use(express.json());
// initializing DB
initDB();
// "/" -> localhost:5000/
app.get("/", logger, (req, res) => {
    res.send("Car Rental System API");
});
//auth routes
app.use("/api/v1/auth", authRoutes);
//users CRUD
app.use("/api/v1/users", userRoutes);
//vehicles CRUD
app.use("/api/v1/vehicles", vehicleRoutes);
//bookings CRUD
app.use("/api/v1/bookings", bookingRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});
export default app;
