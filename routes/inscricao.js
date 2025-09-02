import express from "express";
import { criarTabelaInscricao, get, getById, add, update, delet } from "../controllers/inscricao.js";
const router = express.Router();

router.get("/criar-tabela", (req, res) => criarTabelaInscricao() || res.json({ ok: true }));
router.get("/", get);
router.get("/:id", getById);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", delet);

export default router;
