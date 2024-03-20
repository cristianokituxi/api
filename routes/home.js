import express from "express";
import { addUser, deleteUser, getUsers, updateUser, criarTabelaUsuario, getDataReport} from "../controllers/home.js";

const router = express.Router()
criarTabelaUsuario();
router.get("/getuser:id", getUsers)

router.get("/getDataReport", getDataReport)

router.post("/adduser", addUser)

router.put("/update:id", updateUser)

router.delete("/delete:id", deleteUser)

export default router