import { db } from "../db.js";

export const criarTabelaPessoa = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS pessoa (
    id SERIAL PRIMARY KEY
    nome VARCHAR(30),
    sobrenome VARCHAR(70),
    nome_pai VARCHAR(50),
    nome_mae VARCHAR(100),
    rg VARCHAR(30),
    cpf VARCHAR(30),
    email VARCHAR(50),
    celular VARCHAR(20),
    celular_recado VARCHAR(20),
    data_nascimento DATE,
    data_cadastro DATE,
    cep VARCHAR(30),
    casa_numero VARCHAR(20),
    rua VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(30),
    estado VARCHAR(13),
    complemento VARCHAR(100)
);
`
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela pessoa");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela de pessoas com sucesso...");
  });
};




export const get = (_, res) => {
  const q = "SELECT * FROM pessoa";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = (req, res) => {
  console.log(req, "aqui olha");
  const q = `
    INSERT INTO pessoa(nome, sobrenome, nome_pai, nome_mae, rg, cpf, email, celular, celular_recado, data_nascimento, data_cadastro,cep, casa_numero, rua , bairro, cidade, estado, complemento) 
VALUES ('${req.body.nome}', '${req.body.sobrenome}', '${req.body.nome_pai}' ,
 '${req.body.nome_mae}' , '${req.body.rg}', '${req.body.cpf}', 
 '${req.body.email}','${req.body.celular}','${req.body.celular_recado}',
 '${req.body.data_nascimento}', CURRENT_TIMESTAMP, '${req.body.zipCode}', '${req.body.number}', 
 '${req.body.addressName}', '${req.body.neighborhood}', '${req.body.city}', 
 '${req.body.state}' , '${req.body.complement}'
 
 );
`;
  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("pessoa prima criado com sucesso.");
  });
};


export const update = (req, res) => {
  const q =
    `UPDATE pessoa SET nome = '${req.body.nome}', sobrenome = '${req.body.sobrenome}', nome_pai='${req.body.nome_pai}' ,
    nome_mae ='${req.body.nome_mae}' , rg = '${req.body.rg}', cpf = '${req.body.cpf}', 
    email = '${req.body.email}', celular = '${req.body.celular}', celular_recado = '${req.body.celular_recado}',
    data_nascimento = '${req.body.data_nascimento}', cep = '${req.body.zipCode}', casa_numero = '${req.body.number}', 
    rua ='${req.body.addressName}', bairro = '${req.body.neighborhood}', cidade = '${req.body.city}', 
    estado = '${req.body.state}', complemento = '${req.body.complement}'
     WHERE id = '${req.params.id}'`



  db.query(q, (err) => {
    console.log(q);


    if (err) return res.json(err);

    return res.status(200).json("Materia atualizado com sucesso.");
  });
};

export const delet = (req, res) => {
  const q = `DELETE FROM pessoa WHERE id = '${req.params.id}'`;

  db.query(q, (err) => {
    console.log(q);

    if (err) return res.json(err);

    return res.status(200).json("Funcionario deletado com sucesso!");
  });
};
