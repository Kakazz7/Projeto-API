
const express = require("express");
const router = express.Router();

const agendamentoController = require("../Controllers/Agendamento.controlers.js");

// Criar agendamento
router.post("/", agendamentoController.criar);
// Listar agendamentos
router.get("/", agendamentoController.listar);
// Buscar agendamento por ID
router.get("/:id", agendamentoController.buscar);
// Remarcar agendamento
router.put("/:id", agendamentoController.atualizar);
// Cancelar agendamento
router.delete("/:id", agendamentoController.cancelar);
// Alterar status
router.patch("/:id/status", agendamentoController.alterarStatus);

module.exports = router;
