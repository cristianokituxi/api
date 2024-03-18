import { db } from "../db.js";

export const criarTabelaDepartamento = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS departamento (
    id  SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(100) ,
    UNIQUE(nome)
);
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela departamento");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de departamento com sucesso...");
  });
};


export const getUDepartamanto = (_, res) => {
  const q = "SELECT * FROM departamento";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });

};


export const addDepartamento = (req, res) => {
  console.log(req)
  const q = `
    INSERT INTO departamento(nome, descricao, id) 
VALUES ('${req.body.nome}', '${req.body.descricao}');
`;
  db.query(q, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Departamento criado com sucesso.");
  });
};

export const updateDepartamento = (req, res) => {
  console.log(req.params);
  const q =
    `UPDATE departamento SET nome = '${req.body.nome}', descricao = '${req.body.descricao}'
     WHERE id = '${req.params.id}'`



  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Departamento atualizado com sucesso.");
  });
};

export const deleteDepartamento = (req, res) => {
  const q = `DELETE FROM departamento WHERE id = '${req.params.id}'`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Departamento deletado com sucesso.");
  });
};
