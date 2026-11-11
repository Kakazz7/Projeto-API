
const ClienteModel = require("../Models/ClienteModel.js");

// Cadastra um novo cliente
async function criarCliente(dados) {
    const { nome, email, telefone } = dados;

    if (!nome || !email || !telefone) {
        return null;
    }

    const cliente = {
        nome,
        email,
        telefone
    };

    const resultado = await ClienteModel.inserir(cliente);

    return {
        _id: resultado.insertedId,
        ...cliente
    };
}

// Lista todos os clientes
async function listarClientes() {
    return await ClienteModel.buscarTodas();
}

// Busca um cliente pelo ID
async function buscarCliente(id) {
    return await ClienteModel.buscarPorId(id);
}

// Atualiza os dados de um cliente
async function atualizarCliente(id, dados) {
    const cliente = await ClienteModel.buscarPorId(id);

    if (!cliente) {
        return null;
    }

    const { nome, email, telefone } = dados;

    if (!nome || !email || !telefone) {
        return null;
    }

    await ClienteModel.atualizar(id, {
        nome,
        email,
        telefone
    });

    return await ClienteModel.buscarPorId(id);
}

// Remove um cliente
async function excluirCliente(id) {
    const resultado = await ClienteModel.remover(id);

    return resultado.deletedCount > 0;
}

module.exports = {
    criarCliente,
    listarClientes,
    buscarCliente,
    atualizarCliente,
    excluirCliente
};
