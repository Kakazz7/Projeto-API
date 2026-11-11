
const express = require("express");

const app = express();

app.use(express.json());

// Middleware para registrar as requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de agendamento funcionando!"
    });
});

// Importação das rotas
const clienteRoutes = require("./Routes/Clientesroute.js");
const profissionalRoutes = require("./Routes/Profissionaisroute.js");
const servicoRoutes = require("./Routes/Servicosroute.js");
const agendamentoRoutes = require("./Routes/Agendamentoroute.js");

// Utilização das rotas
app.use("/clientes", clienteRoutes);
app.use("/profissionais", profissionalRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

module.exports = app;
