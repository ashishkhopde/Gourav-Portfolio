import { Router } from "express";
import { adminLogin, checkAuth, adminLogout } from "../controllers/admin.controller.js"

const router = Router();

router.post('/login', adminLogin);
router.get('/check-auth', checkAuth);
router.post('/logout', adminLogout);

export default router;