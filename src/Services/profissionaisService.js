
const ProfissionalModel = require("../Models/ProfissionalModel.js");

// Cadastra um profissional
async function criarProfissional(dados) {
    const { nome, especialidade } = dados;

    if (!nome || !especialidade) {
        return null;
    }

    const profissional = {
        nome,
        especialidade
    };

    const resultado = await ProfissionalModel.inserir(profissional);

    return {
        _id: resultado.insertedId,
        ...profissional
    };
}

// Lista todos os profissionais ou filtra pelo nome
async function listarProfissionais(nome) {
    let resultado = await ProfissionalModel.buscarTodas();

    if (nome) {
        resultado = resultado.filter(profissional =>
            profissional.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    return resultado;
}

// Busca um profissional pelo ID
async function buscarProfissional(id) {
    return await ProfissionalModel.buscarPorId(id);
}

// Atualiza os dados de um profissional
async function atualizarProfissionais(id, dados) {
    const profissional = await ProfissionalModel.buscarPorId(id);

    if (!profissional) {
        return null;
    }

    const { nome, especialidade } = dados;

    if (!nome || !especialidade) {
        return null;
    }

    await ProfissionalModel.atualizar(id, {
        nome,
        especialidade
    });

    return await ProfissionalModel.buscarPorId(id);
}

// Remove um profissional
async function excluirProfissional(id) {
    const resultado = await ProfissionalModel.remover(id);

    return resultado.deletedCount > 0;
}

module.exports = {
    criarProfissional,
    listarProfissionais,
    buscarProfissional,
    atualizarProfissionais,
    excluirProfissional
};
