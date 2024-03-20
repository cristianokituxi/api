import express from "express"
import tipoUsuarioRoutes from "./routes/tipoUsuario.js"
import departamentoRoutes from "./routes/departamento.js"
import funcionarioRoutes from "./routes/funcionario.js";
import usarioRoutes from "./routes/usuario.js"
import usarioRoutesper from "./routes/usuarioper.js"
import usuarioroutessuperv from "./routes/usuariosuperv.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/usuariotipo", tipoUsuarioRoutes)
app.use("/departamento", departamentoRoutes)
app.use("/usuario", usarioRoutes)
app.use("/usuarioper", usarioRoutesper)
app.use("/usuariosuperv", usuarioroutessuperv)
app.use("/funcionario", funcionarioRoutes)


app.listen(8080, () => console.log("server up in 8080"))