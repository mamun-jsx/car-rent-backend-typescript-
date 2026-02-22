import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (email, password) => {
    // Validate inputs
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    // Implementation for user login
    const result = await pool.query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [email]);
    console.log(`Login attempt for email: ${email}, User found: ${(result?.rowCount || 0) > 0}`);
    if (result?.rows?.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const isMatchPassword = await bcrypt?.compare(password, user?.password);
    console.log(`Password match for ${email}: ${isMatchPassword}`);
    //   check password is matched or not
    if (!isMatchPassword) {
        return null;
    }
    //   JWT token generation
    const token = jwt.sign({ id: user.id, name: user?.name, email: user?.email, role: user?.role }, config.jwtSecret, { expiresIn: "7d" });
    //   return token and user data
    delete user?.password; // remove password from user object
    return { token, user };
};
export const authServices = {
    loginUser,
};
