const agendamentoService = require("../services/agendamentoService")

// Criar agendamento
exports.criar = (req, res) => {
    const resultado = agendamentoService.criarAgendamento(req.body)

    if (resultado.erro) {
        return res.status(resultado.status).json({
            erro: resultado.erro
        })
    }

    res.status(201).json(resultado)
}

// Listar agendamentos
exports.listar = (req, res) => {
    res.json(agendamentoService.listarAgendamentos())
}

// Buscar agendamento por ID
exports.buscar = (req, res) => {
    const agendamento = agendamentoService.buscarAgendamento(
        req.params.id
    )

    if (!agendamento) {
        return res.status(404).json({
            erro: "Agendamento não encontrado"
        })
    }

    res.json(agendamento)
}

// Remarcar agendamento
exports.atualizar = (req, res) => {
    const resultado = agendamentoService.atualizarAgendamento(
        req.params.id,
        req.body
    )

    if (resultado.erro) {
        return res.status(resultado.status).json({
            erro: resultado.erro
        })
    }

    res.json(resultado)
}

// Cancelar agendamento
exports.cancelar = (req, res) => {
    const agendamento = agendamentoService.cancelarAgendamento(
        req.params.id
    )

    if (!agendamento) {
        return res.status(404).json({
            erro: "Agendamento não encontrado"
        })
    }

    res.json({
        mensagem: "Agendamento cancelado com sucesso",
        agendamento
    })
}

// Alterar status
exports.alterarStatus = (req, res) => {
    const resultado = agendamentoService.alterarStatus(
        req.params.id,
        req.body.status
    )

    if (resultado.erro) {
        return res.status(resultado.status).json({
            erro: resultado.erro
        })
    }

    res.json(resultado)
}
