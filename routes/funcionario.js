import express from "express";
import { add, criarTabelaPessoa, delet, get, update } from "../controllers/funcionario.js";

const router = express.Router()
criarTabelaPessoa();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router