import { pool } from "../../config/db";

// ? ============================== Create Booking ==========================================================

const createBooking = async (payload: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price: number,
  } = payload;

  const vehicleNameAndPrice = await pool.query(
    `SELECT vehicle_name,daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  // check validation either data is exist or not
  if (vehicleNameAndPrice.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const { daily_rent_price, vehicle_name } = vehicleNameAndPrice.rows[0];

  // calculate booking difference in days
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  const timeDifferences = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDifferences / (1000 * 3600 * 24)) + 1; // +1 to include both start and end date

  if (numberOfDays <= 0) {
    throw new Error("End date must be after start date");
  }
  // calculate total price
  const total_price = numberOfDays * daily_rent_price;

  const result = await pool.query(
    `
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  return { ...result.rows[0], vehicle: { vehicle_name, daily_rent_price } };
};

// ? ============================== Get Booking ==========================================================
const getBooking = async () => {};
// ? ============================== Update Booking ==========================================================
const updateBooking = async () => {};

export const bookingService = {
  createBooking,
  getBooking,
  updateBooking,
};
