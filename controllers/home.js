import { db } from "../db.js";

export const criarTabelaUsuario = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS  usuario (
    id varchar(10),
    usuario_id  SERIAL PRIMARY KEY,
    auth_uid VARCHAR(50),
    nome VARCHAR(30),
    sobrenome VARCHAR(70),
    rg VARCHAR(30),
    cpf VARCHAR(11),
    email VARCHAR(50),
    celular VARCHAR(20),
    celular_recado varchar(20), 
    data_nascimento  DATE,
    data_cadastro DATE,
    func_id  int,
    mat_id int,
    end_id int,
    FOREIGN KEY(func_id) REFERENCES funcao(func_id),
    FOREIGN KEY(mat_id) REFERENCES materia_prima(mat_id),
    FOREIGN KEY(end_id) REFERENCES endereco(end_id)
    
);
    `
  db.query(q, (error) => {

    console.log(q, error);
    if (error) {
      console.log("Eita deu erro na hora de criar a tabela usuario");
      console.log(error.message);
      return;
    }
    console.log("Show criou a tabela com sucesso...");
  });
};



export const getDataReport = (req, res) => {
  const q = `select * from relatorio;
  `;

  db.query(q, (err, data) => {

    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const getUsers = (req, res) => {
  const q = `select * from usuario a LEFT JOIN pessoa p  ON a.pessoa_id  = p.pessoa_id 
  where a.auth_uid  = '${req.params.id}';
  `;

  db.query(q, (err, data) => {

    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q = `
    INSERT INTO relatorio(materia_prima, usuario_id, peso_fardo, data_emit_relatorio) 
VALUES ( '${req.body.tipo_matrial}', ${req.body.id_usuario} ,'${req.body.peso_material}','${req.body.data_emissao}' );
`;
  db.query(q, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    `UPDATE usuarios SET nome = '${req.body.nome}', email = '${req.body.email}', fone = '${req.body.fone}', data_nascimento = '${req.body.data_nascimento}'
     WHERE id = ${req.params.id}`



  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = `DELETE FROM usuarios WHERE id = ${req.params.id}`;

  db.query(q, (err) => {

    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
