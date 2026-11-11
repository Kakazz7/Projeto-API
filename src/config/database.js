
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function conectarBanco() {
    try {
        await client.connect();

        db = client.db(process.env.MONGO_DB);

        console.log("MongoDB conectado com sucesso!");

        return db;
    } catch (erro) {
        console.error("Erro ao conectar ao MongoDB:", erro);
        throw erro;
    }
}

function obterBanco() {
    if (!db) {
        throw new Error("Banco de dados não conectado.");
    }

    return db;
}

module.exports = { conectarBanco, obterBanco };
