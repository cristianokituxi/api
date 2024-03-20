import express from "express";
import { add, criarTabelaMateriaPrima, delet, get, update } from "../controllers/material.js";


const router = express.Router()
criarTabelaMateriaPrima();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router