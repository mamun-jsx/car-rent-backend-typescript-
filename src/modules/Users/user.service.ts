import { pool } from "../../config/db";

// ? ============================== Create User ==========================================================
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, phone, role]
  );
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
  return result;
};
// ? ============================== Delete User ==========================================================
const deleteUser = async (userId: string | number) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1 RETURNING *`,
    [userId]
  );
  return result.rows[0];
};

export const userServices = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
