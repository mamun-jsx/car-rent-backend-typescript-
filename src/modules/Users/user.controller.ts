import { Request, Response } from "express";
import { userServices } from "./user.service";

// ===============================Create User ==========================================================
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req?.body);
    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
const getSingleUser = async (req: Request, res: Response) => {};
const updateUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
