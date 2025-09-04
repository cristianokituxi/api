import express from "express";
import { criarTabelaPresenca,  delet, create, list, filter } from "../controllers/presenca.js";
const router = express.Router();

router.get("/criar-tabela", (req, res) => criarTabelaPresenca() || res.json({ ok: true }));
router.get("/", list); // Lista todas as presenças com JOIN
router.get("/filter", filter); // Filtra por aula_id e data
router.post("/", create); // Cria nova presença
router.delete("/:id", delet); // Deleta presença

export default router;
