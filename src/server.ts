import express, { Request, Response } from "express";
import dotenv from "dotenv";
import initDB from "./config/db";
dotenv.config();

const app = express();
const Port = process.env.port;
app.use(express.json());

initDB();
// Test route
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ data: "Hit root route" });
});

app.listen(Port, async () => {
  console.log(`Server is running on http://localhost:${Port}`);
});