
const agendamentoService = require("../Services/agendamentoService.js");

// Criar agendamento
exports.criar = async (req, res) => {
    try {
        const resultado = await agendamentoService.criarAgendamento(req.body);

        if (resultado.erro) {
            return res.status(resultado.status).json({
                erro: resultado.erro
            });
        }

        res.status(201).json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Listar agendamentos
exports.listar = async (req, res) => {
    try {
        const agendamentos = await agendamentoService.listarAgendamentos();
        res.json(agendamentos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Buscar agendamento por ID
exports.buscar = async (req, res) => {
    try {
        const agendamento = await agendamentoService.buscarAgendamento(
            req.params.id
        );

        if (!agendamento) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }

        res.json(agendamento);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Remarcar agendamento
exports.atualizar = async (req, res) => {
    try {
        const resultado = await agendamentoService.atualizarAgendamento(
            req.params.id,
            req.body
        );

        if (resultado.erro) {
            return res.status(resultado.status).json({
                erro: resultado.erro
            });
        }

        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Cancelar agendamento
exports.cancelar = async (req, res) => {
    try {
        const agendamento = await agendamentoService.cancelarAgendamento(
            req.params.id
        );

        if (!agendamento) {
            return res.status(404).json({
                erro: "Agendamento não encontrado"
            });
        }

        res.json({
            mensagem: "Agendamento cancelado com sucesso",
            agendamento
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Alterar status
exports.alterarStatus = async (req, res) => {
    try {
        const resultado = await agendamentoService.alterarStatus(
            req.params.id,
            req.body.status
        );

        if (resultado.erro) {
            return res.status(resultado.status).json({
                erro: resultado.erro
            });
        }

        res.json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
