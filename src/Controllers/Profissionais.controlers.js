const profissionalService = require("../services/profissionalService")

// Cadastrar profissional
exports.criar = (req, res) => {
    const profissional = profissionalService.criarProfissional(req.body)

    if (!profissional) {
        return res.status(400).json({
            erro: "Nome e especialidade são obrigatórios"
        })
    }

    res.status(201).json(profissional)
}

// Listar profissionais
exports.listar = (req, res) => {
    const profissionais = profissionalService.listarProfissionais(
        req.query.nome
    )

    res.json(profissionais)
}

// Buscar profissional por ID
exports.buscar = (req, res) => {
    const profissional = profissionalService.buscarProfissional(
        req.params.id
    )

    if (!profissional) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }

    res.json(profissional)
}

// Atualizar profissional
exports.atualizar = (req, res) => {
    const profissional = profissionalService.atualizarProfissional(
        req.params.id,
        req.body
    )

    if (!profissional) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }

    res.json(profissional)
}

// Excluir profissional
exports.excluir = (req, res) => {
    const excluido = profissionalService.excluirProfissional(
        req.params.id
    )

    if (!excluido) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }

    res.json({
        mensagem: "Profissional excluído com sucesso"
    })
}

