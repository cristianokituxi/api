import express from "express";
import { addDepartamento, updateDepartamento, deleteDepartamento, getUDepartamanto, criarTabelaDepartamento } from "../controllers/departamento.js";

const router = express.Router()
criarTabelaDepartamento();
router.get("/get", getUDepartamanto)

router.post("/add", addDepartamento)

router.put("/update:id", updateDepartamento)

router.delete("/delete:id", deleteDepartamento)

export default router