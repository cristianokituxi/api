import express from "express"
import usarioRoutes from "./routes/usuario.js"
import vendedor from "./routes/vendedor.js"
import insumosroutes from "./routes/insumos.js"
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/usuario", usarioRoutes)
app.use("/vendedor", vendedor)
app.use("/insumos", insumosroutes)


app.listen(8080, () => console.log("server up in 8080"))