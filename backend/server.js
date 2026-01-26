import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import messageRoute from "./routes/message.route.js";
import adminRoute from "./routes/admin.route.js"

const app = express();

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/",()=>console.log("Server is running"));

app.use("/api/message", messageRoute);
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, ()=>{
    console.log("listening...")
})