import { db } from "../db.js";

export const criarTabelaInscricao = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS inscricoes (
      id SERIAL PRIMARY KEY,
      aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
      data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      aula_id INTEGER REFERENCES aulas(id) ON DELETE CASCADE
    );
  `;
  db.query(q, (error) => {
    if (error) {
      console.log("Erro ao criar tabela inscricoes", error.message);
      return;
    }
    console.log("Tabela inscricoes criada com sucesso.");
  });
};

export const create = (req, res) => {
  const { aluno_id, aula_id } = req.body;
  if (!aluno_id || !aula_id) {
    return res.status(400).json({ error: "aluno_id e aula_id são obrigatórios", message: "Informe aluno e aula." });
  }
  const q = `INSERT INTO inscricoes (aluno_id, aula_id) VALUES (${aluno_id}, ${aula_id}) RETURNING *, data_inscricao;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao criar inscrição." });
    return res.status(201).json({ inscricao: data?.rows?.[0] || data[0], message: "Inscrição realizada com sucesso!" });
  });
};

export const list = (req, res) => {
  const q = `SELECT i.*, al.nome as aluno_nome, al.matricula as aluno_matricula, a.nome as aula_nome FROM inscricoes i LEFT JOIN alunos al ON i.aluno_id = al.id LEFT JOIN aulas a ON i.aula_id = a.id`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao consultar inscrições." });
    return res.json({ inscricoes: data?.rows || data, message: "Consulta de inscrições realizada com sucesso!" });
  });
};

export const getById = (req, res) => {
  const q = `SELECT i.*, al.nome as aluno_nome, al.matricula as aluno_matricula, a.nome as aula_nome FROM inscricoes i LEFT JOIN alunos al ON i.aluno_id = al.id LEFT JOIN aulas a ON i.aula_id = a.id WHERE i.id = ${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao buscar inscrição." });
    if (!data?.rows?.length && !data?.length) return res.status(404).json({ error: "Inscrição não encontrada", message: "Inscrição não encontrada." });
    return res.json({ inscricao: data?.rows?.[0] || data[0], message: "Inscrição encontrada com sucesso!" });
  });
};

export const update = (req, res) => {
  const { aluno_id, aula_id } = req.body;
  let updates = [];
  if (aluno_id) updates.push(`aluno_id = ${aluno_id}`);
  if (aula_id) updates.push(`aula_id = ${aula_id}`);
  if (!updates.length) return res.status(400).json({ error: "Nada para atualizar", message: "Informe aluno_id ou aula_id." });
  const q = `UPDATE inscricoes SET ${updates.join(', ')} WHERE id = ${req.params.id} RETURNING *;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao atualizar inscrição." });
    if (!data?.rows?.length && !data?.length) return res.status(404).json({ error: "Inscrição não encontrada", message: "Inscrição não encontrada." });
    return res.json({ inscricao: data?.rows?.[0] || data[0], message: "Inscrição atualizada com sucesso!" });
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM inscricoes WHERE id = ${req.params.id} RETURNING *;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao excluir inscrição." });
    if (!data?.rowCount) return res.status(404).json({ error: "Inscrição não encontrada", message: "Inscrição não encontrada." });
    return res.json({ message: "Inscrição excluída com sucesso!" });
  });
};

export const listByAula = (req, res) => {
  const aulaId = Number(req.params.aula_id);
  if (!aulaId) {
    return res.status(400).json({ error: "aula_id é obrigatório", message: "Informe o id da aula." });
  }
  const q = `SELECT al.id, i.data_inscricao, al.nome, al.matricula, a.nome as aula_nome FROM inscricoes i LEFT JOIN alunos al ON i.aluno_id = al.id LEFT JOIN aulas a ON i.aula_id = a.id WHERE i.aula_id = ${aulaId}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao consultar alunos inscritos." });
    return res.json({ alunos: data?.rows || data, message: "Consulta de alunos inscritos realizada com sucesso!" });
  });
};
