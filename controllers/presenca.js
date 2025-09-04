import { db } from "../db.js";

export const criarTabelaPresenca = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS presencas (
      id SERIAL PRIMARY KEY,
      aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
      aula_id INTEGER REFERENCES aulas(id) ON DELETE CASCADE,
      data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(q, (error) => {
    if (error) {
      console.log("Erro ao criar tabela presencas", error.message);
      return;
    }
    console.log("Tabela presencas criada com sucesso.");
  });
};

export const create = (req, res) => {
  const { alunoId, aulaId } = req.body;
  if (!alunoId || !aulaId) {
    return res.status(400).json({ error: "alunoId e aulaId são obrigatórios" });
  }
  const q = `INSERT INTO presencas (aluno_id, aula_id) VALUES (${alunoId}, ${aulaId}) RETURNING *;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ presenca: data?.rows?.[0] || data[0], message: "Presença registrada com sucesso!" });
  });
};

export const list = (req, res) => {
  const q = `SELECT p.*, a.nome as aula_nome, al.nome as aluno_nome FROM presencas p LEFT JOIN aulas a ON p.aula_id = a.id LEFT JOIN alunos al ON p.aluno_id = al.id`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ presencas: data?.rows || data, message: "Consulta de presenças realizada com sucesso!" });
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM presencas WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ presencas: data?.rows?.[0] || data[0], message: "Consulta de presença realizada com sucesso!" });
  });
};

export const update = (req, res) => {
  const { aluno_id, aula_id, data_hora } = req.body;
  const q = `UPDATE presencas SET aluno_id=${aluno_id}, aula_id=${aula_id}, data_hora='${data_hora}' WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ presencas: null, message: "Presença atualizada com sucesso!" });
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM presencas WHERE id = ${req.params.id} RETURNING *;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!data?.rowCount) return res.status(404).json({ error: "Presença não encontrada" });
    return res.status(204).send();
  });
};

export const filter = (req, res) => {
  const { aula_id, data } = req.query;
  let q = `SELECT p.*, a.nome as aula_nome, al.nome as aluno_nome FROM presencas p LEFT JOIN aulas a ON p.aula_id = a.id LEFT JOIN alunos al ON p.aluno_id = al.id`;
  const conditions = [];
  if (aula_id) conditions.push(`p.aula_id = ${Number(aula_id)}`);
  if (data) conditions.push(`DATE(p.data_hora) = '${data}'`);
  if (conditions.length) q += ` WHERE ` + conditions.join(' AND ');
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message, message: "Erro ao consultar presenças filtradas." });
    return res.json({ presencas: data?.rows || data, message: "Consulta de presenças filtrada realizada com sucesso!" });
  });
};
