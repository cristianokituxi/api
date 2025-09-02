import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET || "casarao_secret";

export const login = (req, res) => {
  const { email, senha } = req.body;
  console.log(email, senha);
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }
  const q = `SELECT * FROM usuarios WHERE email = '${email}'`;
  db.query(q, async function (err, data) {
          console.log(q, data.rows[0].senha);
          if (err) return res.status(500).json({ error: err.message });
          if (!data || !data.rows || data.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });
          const senhaValida = await bcrypt.compare(senha, data.rows[0].senha || "");
          if (!senhaValida) return res.status(401).json({ error: "Senha inválida" });
          const token = jwt.sign({ id: data.rows[0].id, email: data.rows[0].email, role: data.rows[0].role }, SECRET, { expiresIn: "1d" });
          return res.status(200).json({ token, usuario: data.rows[0] });
      });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
};

export const getMe = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET);
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
