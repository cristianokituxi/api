import express from "express";
import { criarTabelaPresenca, get, getById, add, update, delet } from "../controllers/presenca.js";
const router = express.Router();

router.get("/criar-tabela", (req, res) => criarTabelaPresenca() || res.json({ ok: true }));
router.get("/", get);
router.get("/:id", getById);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", delet);

export default router;
