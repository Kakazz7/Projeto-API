
const express = require("express");
const router = express.Router();

const clienteController = require("../Controllers/Cliente.controlers.js");

// Cadastrar cliente
router.post("/", clienteController.criar);
// Listar clientes
router.get("/", clienteController.listar);
// Buscar cliente por ID
router.get("/:id", clienteController.buscar);
// Atualizar cliente
router.put("/:id", clienteController.atualizar);
// Excluir cliente
router.delete("/:id", clienteController.excluir);

module.exports = router;
