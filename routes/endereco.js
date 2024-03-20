import express from "express";
import { add, criarTabelaEndereco, delet, get, update } from "../controllers/endereco.js";

const router = express.Router()
criarTabelaEndereco();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router