import express from "express"
import cors from "cors"
import alunoRoutes from "./routes/aluno.js"
import aulaRoutes from "./routes/aula.js"
import inscricaoRoutes from "./routes/inscricao.js"
import presencaRoutes from "./routes/presenca.js"
import authRoutes from "./routes/auth.js"
const app = express()

var whitelist = ['https://admin.casaraodasartespedra90.com.br/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use("/aluno", alunoRoutes)
app.use("/aula", aulaRoutes)
app.use("/inscricao", inscricaoRoutes)
app.use("/presenca", presencaRoutes)
app.use("/auth", authRoutes)


app.listen(8080, () => console.log("server up in 8080"))