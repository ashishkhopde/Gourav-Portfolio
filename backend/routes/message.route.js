import { Router } from "express";
import { getAllMessage, postMessage, deleteMessage } from "../controllers/message.controller.js"

const router = Router();

router.get("/", getAllMessage);
router.post("/", postMessage);
router.delete("/:id", deleteMessage);

export default router