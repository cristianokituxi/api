import express from "express"
import cors from "cors"
import alunoRoutes from "./routes/aluno.js"
import aulaRoutes from "./routes/aula.js"
import inscricaoRoutes from "./routes/inscricao.js"
import presencaRoutes from "./routes/presenca.js"
import authRoutes from "./routes/auth.js"
const app = express()

// var whitelist = [
//   'https://admin.casaraodasartespedra90.com.br',
//   'http://localhost:3000' // se quiser testar local
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     // Permite requisições sem origin (ex: Postman, localhost)
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }

app.use(express.json())
app.use(cors())
app.use("/alunos", alunoRoutes)
app.use("/aulas", aulaRoutes)
app.use("/inscricoes", inscricaoRoutes)
app.use("/presencas", presencaRoutes)
app.use("/auth", authRoutes)


app.listen(8080, () => console.log("server up in 8080"))