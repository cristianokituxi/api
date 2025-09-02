import express from "express"
import cors from "cors"
import alunoRoutes from "./routes/aluno.js"
import aulaRoutes from "./routes/aula.js"
import inscricaoRoutes from "./routes/inscricao.js"
import presencaRoutes from "./routes/presenca.js"
import authRoutes from "./routes/auth.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/aluno", alunoRoutes)
app.use("/aula", aulaRoutes)
app.use("/inscricao", inscricaoRoutes)
app.use("/presenca", presencaRoutes)
app.use("/auth", authRoutes)


app.listen(8080, () => console.log("server up in 8080"))