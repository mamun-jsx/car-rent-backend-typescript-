import express, { Request, Response } from "express";
import dotenv from "dotenv";
import initDB from "./config/db";
import { userRoute } from "./modules/Users/user.routes";
import { vehicleRoute } from "./modules/Vehicles/vehicles.route";
import { bookingRoute } from "./modules/Bookings/booking.route";
dotenv.config();

const app = express();
const Port = process.env.port || 4001;

//* =================================MIDDLEWARES=============================================================
app.use(express.json());

initDB(); // database initialization

//* =================================ROUTES====================================================================
app.use("/", userRoute); //*user route is register
app.use("/", vehicleRoute); //*vehicle route is register
app.use("/", bookingRoute); //*vehicle route is register
//* ============================================================================================================

//* =================================ROOT ROUTE=============================================================
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ data: "Hit root route" });
});
//? ============================================================================================================

//* =================================SERVER LISTENING=========================================================
app.listen(Port, async () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
