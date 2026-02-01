import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import messageRoute from "./routes/message.route.js";
import adminRoute from "./routes/admin.route.js"
import videoRoute from "./routes/video.route.js"

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL, "https://sachin-editor-portfolio.vercel.app", "https://sachin-portfolio-admin.vercel.app", "http://localhost:5174", "http://localhost:5173", "http://localhost:3000", "http://localhost:4173"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/message", messageRoute);
app.use("/api/admin", adminRoute);
app.use("/api/video", videoRoute);

const PORT = process.env.PORT || 3000;
console.log(PORT);
// ✅ Ensure the server listens on 0.0.0.0 (not localhost)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});