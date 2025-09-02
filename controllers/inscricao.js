import { db } from "../db.js";

export const criarTabelaInscricao = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS inscricoes (
      id SERIAL PRIMARY KEY,
      aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
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

export const get = (_, res) => {
  db.query("SELECT * FROM inscricoes", (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM inscricoes WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const add = (req, res) => {
  const { aluno_id, aula_id } = req.body;
  const q = `INSERT INTO inscricoes (aluno_id, aula_id) VALUES (${aluno_id}, ${aula_id});`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Inscrição criada com sucesso.");
  });
};

export const update = (req, res) => {
  const { aluno_id, aula_id } = req.body;
  const q = `UPDATE inscricoes SET aluno_id=${aluno_id}, aula_id=${aula_id} WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Inscrição atualizada com sucesso.");
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM inscricoes WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Inscrição deletada com sucesso.");
  });
};
