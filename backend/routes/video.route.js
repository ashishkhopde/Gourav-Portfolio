import { Router } from "express";
import { addVideo, getAllVideos } from "../controllers/video.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get('/', getAllVideos);
router.post(
    "/",
    authMiddleware,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "videoLink", maxCount: 1 },
    ]),
    addVideo
);

export default router;