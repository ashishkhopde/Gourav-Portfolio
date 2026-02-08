import { Router } from "express";
import { createService, deleteService, getAllServices, updateService } from "../controllers/services.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllServices);

router.post("/", authMiddleware, createService);

router.put("/:id", authMiddleware, updateService);

router.delete("/:id", authMiddleware, deleteService);

export default router;