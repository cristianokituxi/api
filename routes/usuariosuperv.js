import express from "express";
import { add,  delet, get, update, getUser, criarTabelaUsuariosuperv } from "../controllers/usuariosuperv.js";


const router = express.Router()
criarTabelaUsuariosuperv();
router.get("/get", get)

router.get("/get:id", getUser)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router