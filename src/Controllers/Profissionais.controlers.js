
const profissionalService = require("../Services/profissionaisService.js");

// Cadastrar profissional
exports.criar = async (req, res) => {
    try {
        const profissional = await profissionalService.criarProfissional(req.body);

        if (!profissional) {
            return res.status(400).json({
                erro: "Nome e especialidade são obrigatórios"
            });
        }

        res.status(201).json(profissional);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Listar profissionais
exports.listar = async (req, res) => {
    try {
        const profissionais = await profissionalService.listarProfissionais(
            req.query.nome
        );

        res.json(profissionais);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

// Buscar profissional por ID
exports.buscar = async (req, res) => {
    try {
        const profissional = await profissionalService.buscarProfissional(
            req.params.id
        );

        if (!profissional) {
            return res.status(404).json({
                erro: "Profissional não encontrado"
            });
        }

        res.json(profissional);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Atualizar profissional
exports.atualizar = async (req, res) => {
    try {
        const profissional = await profissionalService.atualizarProfissionais(
            req.params.id,
            req.body
        );

        if (!profissional) {
            return res.status(404).json({
                erro: "Profissional não encontrado"
            });
        }

        res.json(profissional);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

// Excluir profissional
exports.excluir = async (req, res) => {
    try {
        const excluido = await profissionalService.excluirProfissional(
            req.params.id
        );

        if (!excluido) {
            return res.status(404).json({
                erro: "Profissional não encontrado"
            });
        }

        res.json({
            mensagem: "Profissional excluído com sucesso"
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
