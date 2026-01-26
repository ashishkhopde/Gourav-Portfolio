import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}