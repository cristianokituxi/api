import { db } from "../db.js";

export const criarTabelaAula = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS aulas (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      data DATE,
      horario VARCHAR(20),
      professor VARCHAR(100)
    );
  `;
  db.query(q, (error) => {
    if (error) {
      console.log("Erro ao criar tabela aulas", error.message);
      return;
    }
    console.log("Tabela aulas criada com sucesso.");
  });
};

export const get = (_, res) => {
  db.query("SELECT * FROM aulas", (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ aulas: data?.rows || data, message: "Consulta de aulas realizada com sucesso!" });
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM aulas WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ aulas: data?.rows?.[0] || data[0], message: "Consulta de aula realizada com sucesso!" });
  });
};

export const add = (req, res) => {
  const { nome, data, horario, professor } = req.body;
  const q = `INSERT INTO aulas (nome, data, horario, professor) VALUES ('${nome}', '${data}', '${horario}', '${professor}');`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ aulas: null, message: "Aula criada com sucesso!" });
  });
};

export const update = (req, res) => {
  const { nome, data, horario, professor } = req.body;
  const q = `UPDATE aulas SET nome='${nome}', data='${data}', horario='${horario}', professor='${professor}' WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ aulas: null, message: "Aula atualizada com sucesso!" });
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM aulas WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ aulas: null, message: "Aula deletada com sucesso!" });
  });
};

export const listByAula = (req, res) => {
  try {
    const aulaId = Number(req.params.aula_id);
    if (!aulaId) {
      return res.status(400).json({ error: "aula_id é obrigatório", message: "Informe o id da aula." });
    }
    const q = `SELECT al.id, al.nome, al.matricula FROM inscricoes i LEFT JOIN alunos al ON i.aluno_id = al.id WHERE i.aula_id = ${aulaId}`;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json({ error: err.message, message: "Erro ao consultar alunos inscritos." });
      return res.json({
        alunos: data.rows || data,
        message: "Consulta de alunos inscritos realizada com sucesso!"
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, message: "Erro ao consultar alunos inscritos." });
  }
};
