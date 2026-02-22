// higher order function  return korbe function k
import jwt from "jsonwebtoken";
import config from "../config";
// roles = ["admin", "customer"]
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: "You are not authorized!!" });
            }
            let token = authHeader.replace(/^Bearer\s+/i, "").trim();
            console.log({ authHeader, token });
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log({ decoded });
            req.user = decoded;
            //["admin"]
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    error: "Forbidden!!!",
                });
            }
            next();
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: err.message,
            });
        }
    };
};
export default auth;
