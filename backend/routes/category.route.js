import { Router } from "express";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllCategories);

router.post("/", authMiddleware, addCategory);

router.put("/:id", authMiddleware, updateCategory);

router.delete("/:id", authMiddleware, deleteCategory);

export default router;
