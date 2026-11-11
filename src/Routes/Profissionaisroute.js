
const express = require("express");
const router = express.Router();

const profissionalController = require("../Controllers/Profissionais.controlers.js");

// Cadastrar profissional
router.post("/", profissionalController.criar);
// Listar profissionais
router.get("/", profissionalController.listar);
// Buscar profissional por ID
router.get("/:id", profissionalController.buscar);
// Atualizar profissional
router.put("/:id", profissionalController.atualizar);
// Excluir profissional
router.delete("/:id", profissionalController.excluir);

module.exports = router
