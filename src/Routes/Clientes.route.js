const express = require("express")
const router = express.Router()

const clienteController = require("src/Controllers/Clientes.controlers.js")

router.post("/", clienteController.criar)
router.get("/", clienteController.listar)
router.get("/:id", clienteController.buscar)
router.put("/:id", clienteController.atualizar)
router.delete("/:id", clienteController.excluir)

module.exports = router