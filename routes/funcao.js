import express from "express";
import { add, criarTabelaFuncao, delet, get, update } from "../controllers/funcao.js";


const router = express.Router()
criarTabelaFuncao();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router