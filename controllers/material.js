import { db } from "../db.js";

export const criarTabelaMateriaPrima = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  materia_prima (
    mat_id  SERIAL PRIMARY KEY,
    id varchar(10),
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50) ,
    tipo  VARCHAR(50)

  );
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela endereço");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de departamento com sucesso...");
  });
};

export const get = (_, res) => {
  const q = "SELECT * FROM materia_prima";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  const q = `
    INSERT INTO materia_prima(nome, descricao, tipo , id) 
VALUES ('${req.body.nome}', '${req.body.descricao}', '${req.body.tipo}','${req.body.id}');
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Materia prima criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE materia_prima SET nome = '${req.body.nome}', descricao = '${req.body.descricao}', tipo= '${req.body.tipo}'
     WHERE id = '${req.params.id}'`



  db.query(q, (err) => {


    if (err) return res.json(err);

    return res.status(200).json("Materia atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM materia_prima WHERE id = '${req.params.id}'`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Materia deletado com sucesso.");
  });
};
