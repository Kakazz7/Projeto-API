const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de agendamento funcionando!"
    });
});


const clienteRoutes = require("./routes/clienteRoutes");
const profissionalRoutes = require("./routes/profissionalRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");


app.use("/clientes", clienteRoutes);
app.use("/profissionais", profissionalRoutes);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

module.exports = app;
