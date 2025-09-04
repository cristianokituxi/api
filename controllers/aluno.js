import { db } from "../db.js";

export const criarTabelaAluno = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS alunos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      telefone VARCHAR(20),
      matricula VARCHAR(50) UNIQUE,
      qr_code VARCHAR(100),
      idade VARCHAR(10) DEFAULT '0',
      blusa VARCHAR(50),
      calca VARCHAR(50),
      calcado VARCHAR(50),
      sexo VARCHAR(20),
      identidade_genero TEXT[]
    );
  `;
  db.query(q, (error) => {
    if (error) {
      console.log("Erro ao criar tabela alunos", error.message);
      return;
    }
    console.log("Tabela alunos criada com sucesso.");
  });
};

export const get = (_, res) => {
  db.query("SELECT * FROM alunos", (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ alunos: data?.rows || data, message: "Consulta de alunos realizada com sucesso!" });
  });
};

export const getById = (req, res) => {
  db.query(`SELECT * FROM alunos WHERE id = ${req.params.id}`, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ alunos: data?.rows?.[0] || data[0], message: "Consulta de aluno realizada com sucesso!" });
  });
};

export const add = (req, res) => {
  const { nome, email, telefone, matricula, qr_code, idade, blusa, calca, calcado, sexo, identidade_genero } = req.body;
  const q = `INSERT INTO alunos (nome, email, telefone, matricula, qr_code, idade, blusa, calca, calcado, sexo, identidade_genero) VALUES ('${nome}', '${email}', '${telefone}', '${matricula}', '${qr_code}', '${idade}', '${blusa}', '${calca}', '${calcado}', '${sexo}', '{${identidade_genero.join(',')}}');`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ alunos: null, message: "Aluno criado com sucesso!" });
  });
};

export const update = (req, res) => {
  const { nome, email, telefone, matricula, qr_code, idade, blusa, calca, calcado, sexo, identidade_genero } = req.body;
  const q = `UPDATE alunos SET nome='${nome}', email='${email}', telefone='${telefone}', matricula='${matricula}', qr_code='${qr_code}', idade='${idade}', blusa='${blusa}', calca='${calca}', calcado='${calcado}', sexo='${sexo}', identidade_genero='{${identidade_genero.join(',')}}' WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ alunos: null, message: "Aluno atualizado com sucesso!" });
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM alunos WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ alunos: null, message: "Aluno deletado com sucesso!" });
  });
};
