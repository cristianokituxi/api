import express from "express";
import { getMe, login, } from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.get("/me", getMe);
router.post("/usuarios", create);
router.get("/usuarios", list);

export default router;
