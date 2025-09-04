import { db } from "../db.js";


export const criarTabelaUsuario = () => {
  const q = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome  VARCHAR(50),
    sobrenome  VARCHAR(50),
    login VARCHAR(100),
    senha VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user'
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
  db.query("SELECT * FROM usuarios", (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ usuarios: data?.rows || data, message: "Consulta de usuários realizada com sucesso!" });
  });
};

export const getUser = (req, res) => {
  const q = `select * from usuario u
     LEFT JOIN pessoa p ON  p.pessoa_id  = u.pessoa_id 
     WHERE  auth_uid = '${req.params.id}'`;

  db.query(q, (err, data) => {
    console.log(q);
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const add = async (req, res) => {
  const { email, nome, sobrenome, senha, role } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const q = `INSERT INTO usuarios (email, nome, sobrenome, senha, role) VALUES ('${email}', '${nome}', '${sobrenome}', '${hash}', '${role || 'user'}');`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ usuarios: null, message: "Usuário criado com sucesso!" });
  });
};


export const update = async (req, res) => {
  const { email, nome, sobrenome, senha, role } = req.body;
  let senhaUpdate = "";
  if (senha) {
    const hash = await bcrypt.hash(senha, 10);
    senhaUpdate = `, senha='${hash}'`;
  }
  const q = `UPDATE usuarios SET email='${email}', nome='${nome}', sobrenome='${sobrenome}', role='${role || 'user'}'${senhaUpdate} WHERE id = ${req.params.id}`;
  db.query(q, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ usuarios: null, message: "Usuário atualizado com sucesso!" });
  });
};

export const delet = (req, res) => {
  db.query(`DELETE FROM usuarios WHERE id = ${req.params.id}`, (err) => {
    if (err) return res.json(err);
    return res.status(200).json({ usuarios: null, message: "Usuário deletado com sucesso!" });
  });
};
