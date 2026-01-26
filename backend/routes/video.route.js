import { Router } from "express";
import { addVideo, deleteVideo, getAllVideos, getVideoCount } from "../controllers/video.controller.js"
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
router.delete('/:id', deleteVideo);
router.get('/count', getVideoCount);

export default router;