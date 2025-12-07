import { pool } from "../../config/db";
import bcrypt from "bcrypt";
// ? ============================== Create User ==========================================================
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPassword, phone, role]
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
const updateUser = async (role: string, userId: string | number) => {
  const result = await pool.query(
    `UPDATE users SET role=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
    [role, userId]
  );
  delete result.rows[0].password; // remove password from response
  return result;
};
// ? ============================== Delete User ==========================================================
const deleteUser = async (userId: string | number) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1 RETURNING *`,
    [userId]
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
