import express from "express";
import { add,  delet, get, update, getUser, criarTabelaUsuarioper } from "../controllers/usuarioper.js";


const router = express.Router()
criarTabelaUsuarioper();
router.get("/get", get)

router.get("/get:id", getUser)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router