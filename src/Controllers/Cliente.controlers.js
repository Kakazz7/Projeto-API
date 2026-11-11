
const clienteService = require("../Services/clienteService.js");

exports.criar = async (req, res) => {
    try {
        const cliente = await clienteService.criarCliente(req.body);

        if (!cliente) {
            return res.status(400).json({
                erro: "Nome, email e telefone são obrigatórios"
            });
        }

        res.status(201).json(cliente);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const clientes = await clienteService.listarClientes();
        res.json(clientes);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

exports.buscar = async (req, res) => {
    try {
        const cliente = await clienteService.buscarCliente(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json(cliente);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const cliente = await clienteService.atualizarCliente(
            req.params.id,
            req.body
        );

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json(cliente);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};

exports.excluir = async (req, res) => {
    try {
        const excluido = await clienteService.excluirCliente(req.params.id);

        if (!excluido) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json({
            mensagem: "Cliente excluído com sucesso"
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
};
