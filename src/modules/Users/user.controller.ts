import { Request, Response } from "express";
import { userServices } from "./user.service";

//? ===============================Create User ==========================================================
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req?.body);
    // password must be at least 6 characters long
    if (req?.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
//? =============================== Get Users ==========================================================
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    // remove password from each user object
    result?.rows?.map((user) => delete user.password);
    // send response to frontend
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows, 
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

//? =============================== Update User ==========================================================
const updateUser = async (req: Request, res: Response) => {
  const { role } = req.body;
  const { userId } = req.params;

  try {
    const result = await userServices.updateUser(
      role as string,
      userId as string | number
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
//? =============================== Delete User ==========================================================
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUser(userId as string | number);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

export const userControllers = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};