import express from "express";
import { add,  delet, get,criarTabelaRelatorio, update } from "../controllers/relatorio.js";


const router = express.Router()
 criarTabelaRelatorio();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router