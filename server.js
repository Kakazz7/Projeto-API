const express = require("express")
const app = express()
const PORTA = 3000

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de agendamento funcionando!"
    })
})

//Entidade Clientes e rotas
let clientes = []
let proximoClienteId = 1

app.post("/clientes", (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone) {
        return res.status(400).json({
            erro: "Nome, email e telefone são obrigatórios"
        })
    }
    const cliente = {
        id: proximoClienteId++,
        nome,
        email,
        telefone
    }
    clientes.push(cliente);
    res.status(201).json(cliente);
});

app.get("/clientes", (req, res) => {
    res.json(clientes);
})

app.get("/clientes/:id", (req, res) => {
    const id = Number(req.params.id)

    const cliente = clientes.find(
        cliente => cliente.id === id
    )
    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }
    res.json(cliente)
})

app.put("/clientes/:id", (req, res) => {
    const id = Number(req.params.id)

    const cliente = clientes.find(
        cliente => cliente.id === id
    )

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }

    const { nome, email, telefone } = req.body

    cliente.nome = nome
    cliente.email = email
    cliente.telefone = telefone

    res.json(cliente)
})

app.delete("/clientes/:id", (req, res) => {
    const id = Number(req.params.id)

    const indice = clientes.findIndex(
        cliente => cliente.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        });
    }

    clientes.splice(indice, 1)
    res.json({
        mensagem: "Cliente excluído com sucesso"
    })
})


app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
})
