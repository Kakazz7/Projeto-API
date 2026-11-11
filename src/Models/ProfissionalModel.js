
const { obterBanco } = require("../config/database.js");
const { ObjectId } = require("mongodb");

const colecao = () => obterBanco().collection("profissionais");

async function inserir(profissional) {
    return await colecao().insertOne(profissional);
}

async function buscarTodas() {
    return await colecao().find().toArray();
}

async function buscarPorId(id) {
    return await colecao().findOne({
        _id: new ObjectId(id)
    });
}

async function atualizar(id, dados) {
    return await colecao().updateOne(
        { _id: new ObjectId(id) },
        { $set: dados }
    );
}

async function remover(id) {
    return await colecao().deleteOne({
        _id: new ObjectId(id)
    });
}

module.exports = {
    inserir,
    buscarTodas,
    buscarPorId,
    atualizar,
    remover
};
