
const express = require("express");
const router = express.Router();

const servicoController = require("../Controllers/Servicos.controlers.js");

// Cadastrar serviço
router.post("/", servicoController.criar);
// Listar serviços
router.get("/", servicoController.listar);
// Buscar serviço por ID
router.get("/:id", servicoController.buscar);
// Atualizar serviço
router.put("/:id", servicoController.atualizar);
// Excluir serviço
router.delete("/:id", servicoController.excluir);

module.exports = router
