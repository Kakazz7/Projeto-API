const clienteService = require("src/Services/clienteService.js")


exports.criar = (req, res) => {

    const cliente = clienteService.criarCliente(req.body)

    if (!cliente) {
        return res.status(400).json({
            erro: "Nome, email e telefone são obrigatórios"
        })
    }
    res.status(201).json(cliente);
}

exports.listar = (req, res) => {
    res.json(clienteService.listarClientes())
}

exports.buscar = (req, res) => {
    const cliente = clienteService.buscarCliente(req.params.id)

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }
    res.json(cliente)
}

exports.atualizar = (req, res) => {
    const cliente = clienteService.atualizarCliente(req.params.id, req.body)

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }

    res.json(cliente)
}

exports.excluir = (req, res) =>{
    const excluido = clienteService.excluirCliente(req.params.id)

        if (!excluido) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }

    res.json({
        mensagem: "Cliente excluído com sucesso"
    })
}

