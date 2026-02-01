import jwt from "jsonwebtoken";
import "dotenv/config";

export const adminLogin = (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Login attempt:", { username, password: password ? "***" : "empty" });

        if (!username) {
            return res.status(400).json({ message: "Please enter username" });
        }

        if (!password) {
            return res.status(400).json({ message: "Please enter password" });
        }

        // console.log("ENV USERNAME:", process.env.USERNAME);
        // console.log("ENV PASSWORD:", process.env.PASSWORD ? "***" : "empty");

        if (username !== process.env.USERNAME) {
            return res.status(401).json({ message: "Please enter correct username" });
        }

        if (password !== process.env.PASSWORD) {
            return res.status(401).json({ message: "Please enter correct password" });
        }

        const token = jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
        console.log("Token generated successfully");

        // Set cookie with proper configuration for production and local development
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/'
        });

        console.log("Cookie set successfully");

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: token  // Also send token in response for immediate use
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// New endpoint to check authentication status
export const checkAuth = (req, res) => {
    try {
        const token = req.cookies.token;
        console.log("=== AUTH CHECK ===");
        console.log("Token exists:", !!token);
        // console.log("All cookies:", req.cookies);

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({
                authenticated: false,
                message: "No token found"
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log("Token verified for user:", decoded.username);
        console.log("Token expires:", new Date(decoded.exp * 1000));

        return res.status(200).json({
            authenticated: true,
            user: decoded.username,
            message: "User is authenticated"
        });

    } catch (error) {
        console.error("Auth check error:", error.message);
        return res.status(401).json({
            authenticated: false,
            message: "Invalid token"
        });
    }
}

// Logout endpoint
export const adminLogout = (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/'
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}