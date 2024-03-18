import express from "express";
import { add, criarTabelaTipoUsuario, delet, get, update } from "../controllers/tipoUsuario.js";


const router = express.Router()
criarTabelaTipoUsuario();
router.get("/get", get)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router