
const app = require("./app.js");
const { conectarBanco } = require("./config/database.js");

const PORTA = 3000;

async function iniciarServidor() {
    try {
        await conectarBanco();

        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}`);
        });
    } catch (erro) {
        console.error("Erro ao iniciar servidor:", erro);
    }
}

iniciarServidor();
