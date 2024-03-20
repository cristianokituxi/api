import { db } from "../db.js";

export const criarTabelaEndereco = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  endereco (
    id varchar(10),
    end_id  SERIAL PRIMARY KEY,
    cep varchar(50),
    casa_numero VARCHAR(10),
    rua  VARCHAR(100) ,
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR (50),
    sigla   VARCHAR (3)
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
  const q = "SELECT * FROM endereco";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  const q = `
    INSERT INTO endereco(cep, casa_numero, rua , bairro, cidade, estado, sigla) 
VALUES ('${req.body.cep}', '${req.body.casa_numero}', '${req.body.rua}', '${req.body.bairro}', '${req.body.cidade}' , '${req.body.estado}' , '${req.body.sigla}');
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Materia prima criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE endereco SET cep = '${req.body.cep}', casa_numero = '${req.body.casa_numero}', rua ='${req.body.rua}', bairro = '${req.body.bairro}', cidade = '${req.body.cidade}' , estado = '${req.body.estado}' , sigla = '${req.body.sigla}'
     WHERE end_id = ${req.params.id}`



  db.query(q, (err) => {


    if (err) return res.json(err);

    return res.status(200).json("Materia atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM endereco WHERE end_id = ${req.params.id}`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Materia deletado com sucesso.");
  });
};
