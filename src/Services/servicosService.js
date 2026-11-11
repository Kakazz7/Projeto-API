
const ServicoModel = require("../Models/ServicoModel.js");

// Cadastra um serviço
async function criarServico(dados) {
    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = dados;

    if (!nome || !categoria || !duracao || preco === undefined) {
        return null;
    }

    const servico = {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    };

    const resultado = await ServicoModel.inserir(servico);

    return {
        _id: resultado.insertedId,
        ...servico
    };
}

// Lista todos os serviços ou filtra por nome e categoria
async function listarServicos(nome, categoria) {
    let resultado = await ServicoModel.buscarTodas();

    if (nome) {
        resultado = resultado.filter(servico =>
            servico.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (categoria) {
        resultado = resultado.filter(servico =>
            servico.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
    }

    return resultado;
}

// Busca um serviço pelo ID
async function buscarServico(id) {
    return await ServicoModel.buscarPorId(id);
}

// Atualiza as informações de um serviço
async function atualizarServicos(id, dados) {
    const servico = await ServicoModel.buscarPorId(id);

    if (!servico) {
        return null;
    }

    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = dados;

    if (!nome || !categoria || !duracao || preco === undefined) {
        return null;
    }

    await ServicoModel.atualizar(id, {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    });

    return await ServicoModel.buscarPorId(id);
}

// Remove um serviço
async function excluirServico(id) {
    const resultado = await ServicoModel.remover(id);

    return resultado.deletedCount > 0;
}

module.exports = {
    criarServico,
    listarServicos,
    buscarServico,
    atualizarServicos,
    excluirServico
}
