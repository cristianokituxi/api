import express from "express";
import { add,  delet, get, update, getUser, criarTabelaVendedor } from "../controllers/vendedor.js";


const router = express.Router()
criarTabelaVendedor();
router.get("/get", get)

router.get("/get:id", getUser)

router.post("/add", add)

router.put("/update:id", update)

router.delete("/delete:id", delet)

export default router