import { db } from "../db.js";

export const criarInsumos = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  insumos (
    id SERIAL PRIMARY KEY,
    usuario_id  int,
    nome  VARCHAR(50) NOT NULL,
    segmento  VARCHAR(50) NOT NULL,
    produto  VARCHAR(50) NOT NULL,
    data    Date,
    negociado  VARCHAR(30), 
    FOREIGN KEY(usuario_id) REFERENCES usuario(id)
  );
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela insumos");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de insumos com sucesso...");
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
    INSERT INTO insumos(usuario_id,segmento, produto , nome ) 
VALUES (${req.body.usuario_id},'${req.body.segmento}', '${req.body.produto}','${req.body.nome}', CURRENT_DATE,);
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("sucesso.");
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
