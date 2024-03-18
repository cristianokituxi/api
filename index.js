import express from "express"
import funcionarioRoutes from "./routes/funcionario.js";
import usarioRoutes from "./routes/usuario.js"
import usarioRoutesper from "./routes/usuarioper.js"
import departamentoRoutes from "./routes/departamento.js"
import tipoUsuarioRoutes from "./routes/tipoUsuario.js"
import usuarioroutessuperv from "./routes/usuariosuperv.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/funcionario", funcionarioRoutes)
app.use("/departamento", departamentoRoutes)
app.use("/usuariotipo", tipoUsuarioRoutes)
app.use("/usuario", usarioRoutes)
app.use("/usuarioper", usarioRoutesper)
app.use("/usuariosuperv", usuarioroutessuperv)


app.listen(8080, () => console.log("server up in 8080"))