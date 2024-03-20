import { db } from "../db.js";

export const criarTabelaFuncao = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS funcaop (
    id varchar(10),
    func_id  SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(100) ,
    dep_id int,
    unique(nome),
    FOREIGN KEY(dep_id) REFERENCES departamento(dep_id)

  );
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela função");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de departamento com sucesso...");
  });
};

export const get = (_, res) => {
  const q = "SELECT * FROM Funcao";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  console.log(req)
  const q = `
    INSERT INTO funcao(nome, descricao, dep_id) 
VALUES ('${req.body.nome}', '${req.body.descricao}', ${req.body.dep_id});
`;
  db.query(q, (err) => {
    console.log(q);
    if (err) return res.json(err);

    return res.status(200).json("Função criado com sucesso.");
  });
};

export const update = (req, res) => {
  console.log(req.params);
  const q =
    `UPDATE Funcao SET nome = '${req.body.nome}', descricao = '${req.body.descricao}'
     WHERE func_id = ${req.params.id}`



  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Função atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM funcao WHERE func_id = ${req.params.id}`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Função deletado com sucesso.");
  });
};
