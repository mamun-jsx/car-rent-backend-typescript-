import express, { Request, Response } from "express";
import dotenv from "dotenv";
import initDB from "./config/db";
import { userRoute } from "./modules/Users/user.routes";
dotenv.config();

const app = express();
const Port = process.env.port;
app.use(express.json());

initDB();
//* =================================ROUTES====================================================================
app.use("/", userRoute); //*user route is register


// Test route
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ data: "Hit root route" });
});

app.listen(Port, async () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
// const getUser = async () => {
//   const result = await pool.query(`SELECT * FROM users`);
//   return result;
// };