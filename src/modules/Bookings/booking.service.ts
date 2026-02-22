import { pool } from "../../config/db";

// ? ============================== Create Booking ==========================================================

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // Check vehicle availability
  const vehicleCheck = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1 AND availability_status = 'available'`,
    [vehicle_id],
  );
  if (vehicleCheck.rowCount === 0) {
    throw new Error("Vehicle not available");
  }

  const { daily_rent_price, vehicle_name } = vehicleCheck.rows[0];

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

  // Insert booking
  const result = await pool.query(
    `
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price],
  );

  // Update vehicle status to booked
  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id],
  );

  return { ...result.rows[0], vehicle: { vehicle_name, daily_rent_price } };
};

// ? ============================== Get Booking ==========================================================
const getBooking = async (role: string, userId: number) => {
  let query = `SELECT * FROM bookings`;
  let params: any[] = [];

  if (role === "customer") {
    query += ` WHERE customer_id = $1`;
    params = [userId];
  }

  const result = await pool.query(query, params);
  return result.rows;
};

// ? ============================== Update Booking ==========================================================
const updateBooking = async (
  id: string | number,
  status: string,
  user: any,
) => {
  // Get booking
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [id],
  );
  if (bookingResult.rowCount === 0) {
    throw new Error("Booking not found");
  }
  const booking = bookingResult.rows[0];

  if (user.role === "customer") {
    // Customer can only cancel before start date
    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    // Compare only the date parts (not time)
    const today = new Date();
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const startDate = new Date(booking.rent_start_date);
    const startDateOnly = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );

    if (todayDate > startDateOnly) {
      throw new Error("Cannot cancel booking after start date");
    }

    // Update status
    const result = await pool.query(
      `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id],
    );
    // Update vehicle to available
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id],
    );
    return result.rows[0];
  } else if (user.role === "admin") {
    // Admin can mark as returned
    if (status !== "returned") {
      throw new Error("Admins can only mark bookings as returned");
    }
    const result = await pool.query(
      `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id],
    );
    // Update vehicle to available
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id],
    );
    return result.rows[0];
  } else {
    throw new Error("Unauthorized");
  }
};

export const bookingService = {
  createBooking,
  getBooking,
  updateBooking,
};
