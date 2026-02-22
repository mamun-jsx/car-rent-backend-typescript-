// higher order function  return korbe function k

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "customer"]
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "You are not authorized!!" });
      }
      let token = authHeader.replace(/^Bearer\s+/i, "").trim();
      console.log({ authHeader, token });
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string,
      ) as JwtPayload;
      console.log({ decoded });
      req.user = decoded;

      //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          error: "Forbidden!!!",
        });
      }

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
