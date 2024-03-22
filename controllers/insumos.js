import { db } from "../db.js";

export const criarInsumos = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  insumos(
    id SERIAL PRIMARY KEY,
    usuario_id  int,
    nome  VARCHAR(50) NOT NULL,
    segmento VARCHAR(50) NOT NULL,
    produto VARCHAR(50) NOT NULL,
    FOREIGN KEY(usuario_id) REFERENCES usuario(usuario_id)
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
  const q = "SELECT * FROM insumos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  const q = `
    INSERT INTO insumos(nome, descricao) 
VALUES ('${req.body.segmento}', '${req.body.produto}');
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Materia prima criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE insumos SET nome = '${req.body.produto}', segmento = '${req.body.segmento}'
     WHERE id = '${req.params.id}'`



  db.query(q, (err) => {


    if (err) return res.json(err);
    return res.status(200).json("insumos atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM insumos WHERE id = '${req.params.id}'`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Materia deletado com sucesso.");
  });
};
