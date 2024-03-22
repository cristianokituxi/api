import express from "express";
import { add, delet, get, update, criarInsumos } from "../controllers/insumos.js";


const router = express.Router()
criarInsumos();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router