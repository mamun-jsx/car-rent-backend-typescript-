import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "./auth.service";

// higher order function for role based access.
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, jwtSecretKey as string);
      console.log("decoded value --> ", decoded);
      req.user = decoded;
      next();
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error?.message });
    }
  };
};
export default auth;
