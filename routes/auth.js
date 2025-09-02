import express from "express";
import { getMe, login, } from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.get("/me", getMe);


export default router;
