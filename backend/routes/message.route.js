import { Router } from "express";
import { getAllMessage, postMessage, deleteMessage, getMessageCount } from "../controllers/message.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllMessage);
router.post("/", postMessage);
router.delete("/:id", authMiddleware ,deleteMessage);
router.get("/count", authMiddleware, getMessageCount);

export default router