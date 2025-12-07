import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.loginUser(email, password);
    // check if login failed send error response
    if (result === null) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // send success response to client side
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

export const authControllers = {
    loginUser
}