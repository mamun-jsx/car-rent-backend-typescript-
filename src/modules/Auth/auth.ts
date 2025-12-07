import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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
      //   decoded jwt token
      const decoded = jwt.verify(token, jwtSecretKey as string) as JwtPayload;

      //!______decoded and assign to request____________
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      //? NEXT FUNCTION CALL
      next();
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error?.message });
    }
  };
};
export default auth;


