import express from "express";
import { criarTabelaInscricao, list, getById, create, update, delet, listByAula } from "../controllers/inscricao.js";
const router = express.Router();

router.get("/criar-tabela", (req, res) => criarTabelaInscricao() || res.json({ ok: true }));
router.get("/", list); // Lista todas as inscrições
router.get("/:id", getById); // Busca inscrição por id
router.post("/", create); // Cria inscrição
router.put("/:id", update); // Atualiza inscrição
router.delete("/:id", delet); // Deleta inscrição
router.get("/aulas/:aula_id", listByAula); // Lista alunos por aula

export default router;
