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

export const get = (_, res) => {
  db.query("SELECT * FROM presencas", (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM presencas WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const add = (req, res) => {
  const { aluno_id, aula_id, data_hora } = req.body;
  const q = `INSERT INTO presencas (aluno_id, aula_id, data_hora) VALUES (${aluno_id}, ${aula_id}, '${data_hora || ''}');`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Presença criada com sucesso.");
  });
};

export const update = (req, res) => {
  const { aluno_id, aula_id, data_hora } = req.body;
  const q = `UPDATE presencas SET aluno_id=${aluno_id}, aula_id=${aula_id}, data_hora='${data_hora}' WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Presença atualizada com sucesso.");
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM presencas WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Presença deletada com sucesso.");
  });
};
