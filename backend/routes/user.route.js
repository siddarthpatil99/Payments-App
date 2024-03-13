import { Router } from "express";
import { signup, signin, updateInfo, currentUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.put("/", authMiddleware, updateInfo);

router.get("/currentUser", authMiddleware, currentUser);


export default router;