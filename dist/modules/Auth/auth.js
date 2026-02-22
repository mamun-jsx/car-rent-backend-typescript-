import jwt from "jsonwebtoken";
import config from "../../config";
// higher order function for role based access.
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, message: "Unauthorized" });
            }
            //   decoded jwt token
            const decoded = jwt.verify(token, config.jwtSecret);
            //!______decoded and assign to request____________
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }
            //? NEXT FUNCTION CALL
            next();
        }
        catch (error) {
            return res.status(401).json({ success: false, message: error?.message });
        }
    };
};
export default auth;
