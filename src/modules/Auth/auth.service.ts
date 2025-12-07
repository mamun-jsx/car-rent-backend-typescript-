import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const jwtSecretKey = process.env.jwt_secret_key as string;
const loginUser = async (email: string, password: string) => {
  // take jwt secret key from environment variable

  // Implementation for user login
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result?.rows?.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const isMatchPassword = await bcrypt?.compare(password, user?.password);
  //   check password is matched or not
  if (!isMatchPassword) {
    return null;
  }
  //   JWT token generation
  const token = jwt.sign(
    { name: user?.name, email: user?.email },
    jwtSecretKey,
    { expiresIn: "7d" }
  );
  //   return token and user data
  delete user?.password; // remove password from user object
  return { token, user };
};

export const authServices = {
  loginUser,
};
