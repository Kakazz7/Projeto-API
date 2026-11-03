const express = require("express")
const router = express.Router()

const  agendamentoController = require("src/Controllers/Agendamento.controlers.js")

router.post("/", agendamentoController.criar)
router.get("/", agendamentoController.listar)
router.get("/:id", agendamentoController.buscar)
router.put("/:id", agendamentoController.atualizar)
router.delete("/:id", agendamentoController.cancelar)
router.patch("/:id/status", agendamentoController.Status)

module.exports = router