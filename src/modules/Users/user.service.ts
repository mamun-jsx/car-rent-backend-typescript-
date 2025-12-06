import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, phone, role]
  );
  return result;
};
const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const updateUser = async (role: string, userId: string | number) => {
  const result = await pool.query(
    `UPDATE users SET role=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
    [role, userId]
  );
  return result;
};

const deleteUser = async () => {};

export const userServices = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
