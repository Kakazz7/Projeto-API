
const servicoService = require("../Services/servicosService.js");

// Cadastrar serviço
exports.criar = async (req, res) => {
    try {
        const servico = await servicoService.criarServico(req.body);

        if (!servico) {
            return res.status(400).json({
                erro: "Nome, categoria, duração e preço são obrigatórios"
            });
        }

        res.status(201).json(servico);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Listar serviços
exports.listar = async (req, res) => {
    try {
        const servicos = await servicoService.listarServicos(
            req.query.nome,
            req.query.categoria
        );

        res.json(servicos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Buscar serviço por ID
exports.buscar = async (req, res) => {
    try {
        const servico = await servicoService.buscarServico(req.params.id);

        if (!servico) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        res.json(servico);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Atualizar serviço
exports.atualizar = async (req, res) => {
    try {
        const servico = await servicoService.atualizarServicos(
            req.params.id,
            req.body
        );

        if (!servico) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        res.json(servico);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Excluir serviço
exports.excluir = async (req, res) => {
    try {
        const excluido = await servicoService.excluirServico(req.params.id);

        if (!excluido) {
            return res.status(404).json({
                erro: "Serviço não encontrado"
            });
        }

        res.json({
            mensagem: "Serviço excluído com sucesso"
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
