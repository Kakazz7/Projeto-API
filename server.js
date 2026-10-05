const express = require("express");
const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de agendamento funcionando!"
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
