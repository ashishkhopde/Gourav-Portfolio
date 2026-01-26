import jwt from "jsonwebtoken";
import "dotenv/config";

export const adminLogin = (req, res) => {
    const { username, password } = req.body;

    try {

        if (!username) {
            return res.status(400).json({ message: "Please enter username" });
        }

        if (!password) {
            return res.status(400).json({ message: "Please enter password" });
        }

        console.log("ENV USERNAME:", process.env.USERNAME);
        console.log("ENV PASSWORD:", process.env.PASSWORD);


        if (username !== process.env.USERNAME) {
            return res.status(401).json({ message: "Please enter correct username" });
        }

        if (password !== process.env.PASSWORD) {
            return res.status(401).json({ message: "Please enter correct username" });
        }

        const token = jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: "1d" });

        return res
            .cookie("token", token, {
                withCredentials: true,
                httpOnly: true,        // Prevent JS access (XSS protection)
                secure: true,          // Send only over HTTPS
                sameSite: "strict",    // Prevent CSRF
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .status(200)
            .json({
                message: "User logged in successfully",
                success: true,
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}