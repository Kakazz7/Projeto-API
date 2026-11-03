const servicoService = require("../services/servicoService")

// Cadastrar serviço
exports.criar = (req, res) => {
    const servico = servicoService.criarServico(req.body)

    if (!servico) {
        return res.status(400).json({
            erro: "Nome, categoria, duração e preço são obrigatórios"
        })
    }

    res.status(201).json(servico)
}

// Listar serviços
exports.listar = (req, res) => {
    const servicos = servicoService.listarServicos(
        req.query.nome,
        req.query.categoria
    )

    res.json(servicos)
}

// Buscar serviço por ID
exports.buscar = (req, res) => {
    const servico = servicoService.buscarServico(req.params.id)

    if (!servico) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    res.json(servico)
}

// Atualizar serviço
exports.atualizar = (req, res) => {
    const servico = servicoService.atualizarServico(
        req.params.id,
        req.body
    )

    if (!servico) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    res.json(servico)
}

// Excluir serviço
exports.excluir = (req, res) => {
    const excluido = servicoService.excluirServico(req.params.id)

    if (!excluido) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    res.json({
        mensagem: "Serviço excluído com sucesso"
    })
}

