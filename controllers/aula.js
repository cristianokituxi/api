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
    return res.status(200).json(data);
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM aulas WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const add = (req, res) => {
  const { nome, data, horario, professor } = req.body;
  const q = `INSERT INTO aulas (nome, data, horario, professor) VALUES ('${nome}', '${data}', '${horario}', '${professor}');`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Aula criada com sucesso.");
  });
};

export const update = (req, res) => {
  const { nome, data, horario, professor } = req.body;
  const q = `UPDATE aulas SET nome='${nome}', data='${data}', horario='${horario}', professor='${professor}' WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Aula atualizada com sucesso.");
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM aulas WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Aula deletada com sucesso.");
  });
};
