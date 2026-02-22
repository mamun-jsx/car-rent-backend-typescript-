import { authServices } from "./auth.service";
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
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
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};
export const authControllers = {
    loginUser,
};
