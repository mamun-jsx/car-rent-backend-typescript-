import { Request, Response } from "express";
import { userServices } from "./user.service";

//? ===============================Create User ==========================================================
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role = "customer" } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and phone are required",
      });
    }

    // password must be at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const result = await userServices.createUser({
      name,
      email,
      password,
      phone,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    // Handle duplicate email or phone error
    if (error.message.includes("duplicate key") || error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
      });
    }
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
  const { userId } = req.params;
  const updates = req.body;
  const user = req.user as any;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    // Check permissions
    if (user.role !== "admin" && user.id != userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const result = await userServices.updateUser(updates, userId);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    if (error.message.includes("User not found")) {
      return res.status(404).json({ success: false, message: error?.message });
    }
    if (error.message.includes("No valid fields")) {
      return res.status(400).json({ success: false, message: error?.message });
    }
    return res.status(500).json({ success: false, message: error?.message });
  }
};
//? =============================== Delete User ==========================================================
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const result = await userServices.deleteUser(userId as string | number);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message.includes("User not found")) {
      return res.status(404).json({ success: false, message: error?.message });
    }
    if (error.message.includes("active bookings")) {
      return res.status(400).json({ success: false, message: error?.message });
    }
    return res.status(500).json({ success: false, message: error?.message });
  }
};

export const userControllers = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
