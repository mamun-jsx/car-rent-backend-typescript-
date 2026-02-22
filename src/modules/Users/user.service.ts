import { pool } from "../../config/db";
import bcrypt from "bcrypt";
// ? ============================== Create User ==========================================================
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  // Check if email already exists
  const emailCheck = await pool.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`,
    [email],
  );
  if ((emailCheck?.rowCount || 0) > 0) {
    throw new Error("Email already exists");
  }

  // Check if phone already exists
  const phoneCheck = await pool.query(`SELECT * FROM users WHERE phone = $1`, [
    phone,
  ]);
  if ((phoneCheck?.rowCount || 0) > 0) {
    throw new Error("Phone number already exists");
  }

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPassword, phone, role],
  );
  delete result.rows[0].password; // remove password from response
  return result;
};
// ? ============================== Get Users ==========================================================
const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};
// ? ============================== Update User ==========================================================
const updateUser = async (
  updates: Record<string, unknown>,
  userId: string | number,
) => {
  // Check if user exists
  const userCheck = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    userId,
  ]);
  if (userCheck.rowCount === 0) {
    throw new Error(`User not found with id: ${userId}`);
  }

  const fields = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (key !== "password") {
      // password update separately if needed
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No valid fields to update");
  }

  values.push(userId);
  const query = `UPDATE users SET ${fields.join(", ")}, updated_at=NOW() WHERE id=$${paramIndex} RETURNING *`;

  const result = await pool.query(query, values);
  delete result.rows[0].password;
  return result;
};
// ? ============================== Delete User ==========================================================
const deleteUser = async (userId: string | number) => {
  // Check if user exists
  const userCheck = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    userId,
  ]);
  if (userCheck.rowCount === 0) {
    throw new Error(`User not found with id: ${userId}`);
  }

  // Check for active bookings
  const bookingCheck = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [userId],
  );
  if (bookingCheck.rows.length > 0) {
    throw new Error("Cannot delete user with active bookings");
  }

  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1 RETURNING *`,
    [userId],
  );
  delete result.rows[0].password; // remove password from response
  return result.rows[0];
};

export const userServices = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
