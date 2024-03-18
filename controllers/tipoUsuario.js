import { db } from "../db.js";

export const criarTabelaTipoUsuario = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS   tipo_usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50) 
  );
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela tipo de usuario");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de tipo de ususario com sucesso...");
  });
};

export const get = (_, res) => {
  const q = "SELECT * FROM  tipo_usuario"

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  const q = `
    INSERT INTO tipo_usuario (nome, descricao, id) 
VALUES ('${req.body.nome}', '${req.body.descricao}');
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("tipo de usuario criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE  tipo_usuario SET nome = '${req.body.nome}', descricao = '${req.body.descricao}'
     WHERE id = '${req.params.id}'`



  db.query(q, (err) => {


    if (err) return res.json(err);

    return res.status(200).json("tipo de usuario atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM tipo_usuario WHERE id = '${req.params.id}'`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("tipo de usuario deletado com sucesso.");
  });
};
