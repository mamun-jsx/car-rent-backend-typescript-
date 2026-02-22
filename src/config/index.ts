import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connectionString: process.env.connectionString,
  port: process.env.port || 4001,
  jwtSecret: process.env.jwt_secret_key,
};

export default config;
