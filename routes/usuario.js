import express from "express";
import { add, criarTabelaUsuario, delet, get, update, getUser } from "../controllers/usuario.js";


const router = express.Router()
criarTabelaUsuario();
router.get("/get", get)

router.get("/get:id", getUser)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router