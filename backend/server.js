import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import messageRoute from "./routes/message.route.js";
import adminRoute from "./routes/admin.route.js";
import videoRoute from "./routes/video.route.js";
import categoryRoute from "./routes/category.route.js";
import servicesRoute from "./routes/services.route.js";

const app = express();

const envOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean);
const extraOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...envOrigins, ...extraOrigins])];

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : undefined,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/message", messageRoute);
app.use("/api/admin", adminRoute);
app.use("/api/video", videoRoute);
app.use("/api/category", categoryRoute);
app.use("/api/services", servicesRoute);

const PORT = process.env.PORT || 3000;
console.log(PORT);
// ✅ Ensure the server listens on 0.0.0.0 (not localhost)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
