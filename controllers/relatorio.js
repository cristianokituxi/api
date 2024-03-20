import { db } from "../db.js";

export const criarTabelaRelatorio = () => {
  const q = `
    CREATE TABLE IF NOT EXISTS  relatorio(
    id varchar(10),
    relatorio_id  SERIAL PRIMARY KEY,
    funcionario  VARCHAR(100),
    materia_prima  VARCHAR(50),
    peso_fardo VARCHAR(10),
    data_envio VARCHAR(20),
    hora_envio  VARCHAR(20),
    aprovacao_hora VARCHAR(20),
    aprovacao_data  VARCHAR(20),
    user_aprovador_nome  VARCHAR(50),
    user_aprovador_id int default NULL,
    FOREIGN KEY(user_aprovador_id) REFERENCES usuario(usuario_id)
    );
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela relatório");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de departamento com sucesso...");
  });
};

export const get = (_, res) => {
  const q = "SELECT * FROM relatorio";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  console.log(req)
  const q = `
    INSERT INTO relatorio(funcionario, materia_prima, peso_fardo, data_envio,hora_envio) 
VALUES ('${req.body.funcionario}', '${req.body.materia_prima}', '${req.body.peso_fardo}', '${req.body.data_envio}', '${req.body.hora_envio}');
`;
  db.query(q, (err) => {
    console.log(q);
    if (err) return res.json(err);

    return res.status(200).json("Etiqueta enviada para aprovação.");
  });
};

export const update = (req, res) => {
  console.log(req.params);
  const q =
    `UPDATE relatorio SET user_aprovador_id = ${req.body.user_aprovador_id}, aprovacao_data = '${req.body.aprovacao_data}', aprovacao_hora = '${req.body.aprovacao_hora}', user_aprovador_nome = '${req.body.user_aprovador_nome}'
     WHERE relatorio_id = ${req.params.id}`
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("relatorio aprovado.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM funcao WHERE func_id = ${req.params.id}`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Função deletado com sucesso.");
  });
};
