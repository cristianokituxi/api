import { db } from "../db.js";

export const criarTabelaVendedor = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  usuario_vendedor (
   
    id SERIAL PRIMARY KEY
    auth_uid VARCHAR(50),
    login VARCHAR(100),
    senha VARCHAR(100),
    repete_senha VARCHAR(100),
   
);
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela usuario");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de departamento com sucesso...");
  });
};

export const get = (_, res) => {
  const q = "SELECT * FROM usuario_operador"

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const getUser = (req, res) => {
  const q = `select * from usuario_operador u
     LEFT JOIN pessoa p ON  p.pessoa_id  = u.pessoa_id 
     WHERE  auth_uid = '${req.params.id}'`;

  db.query(q, (err, data) => {
    console.log(q);
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  const q = `
    INSERT INTO usuario_operador(auth_uid, nome, sobrenome, login, senha, repete_senha) 
    VALUES ('${req.body.auth_uid}', '${req.body.nome}' , '${req.body.sobrenome}', '${req.body.login}' , '${req.body.repete_senha}');
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("usuario prima criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE usuario_operador SET  tipo_user_id = '${req.body.tipo_user_id}', mat_id = '${req.body.mat_id}'
     WHERE id = ${req.params.id}`



  db.query(q, (err) => {


    if (err) return res.json(err);

    return res.status(200).json("Materia atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM usuario_operador WHERE usuario_id = ${req.params.id}`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("usuario operador  deletado com sucesso.");
  });
};
