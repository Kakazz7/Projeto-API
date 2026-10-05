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

//Entidade PRofissional e rotas
let profissionais = []
let proximoProfissionalId = 1

app.post("/profissionais", (req, res) => {
    const { nome, especialidade } = req.body
    if (!nome || !especialidade) {
        return res.status(400).json({
            erro: "Nome e especialidade são obrigatórios"
        })
    }
    const profissional = {
        id: proximoProfissionalId++,
        nome,
        especialidade
    }

    profissionais.push(profissional);
    res.status(201).json(profissional);
})

app.get("/profissionais", (req, res) => {
    res.json(profissionais)
})

app.get("/profissionais/:id", (req, res) => {
    const id = Number(req.params.id);
    const profissional = profissionais.find(
        profissional => profissional.id === id
    )

    if (!profissional) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }
    res.json(profissional)
})

app.put("/profissionais/:id", (req, res) => {
    const id = Number(req.params.id)
    const profissional = profissionais.find(
        profissional => profissional.id === id
    )
    if (!profissional) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }

    const { nome, especialidade } = req.body
    profissional.nome = nome
    profissional.especialidade = especialidade
    res.json(profissional)
})

app.delete("/profissionais/:id", (req, res) => {

    const id = Number(req.params.id);
    const indice = profissionais.findIndex(
        profissional => profissional.id === id
    )
    if (indice === -1) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        })
    }

    profissionais.splice(indice, 1);
    res.json({
        mensagem: "Profissional excluído com sucesso"
    })
})

//Entidade Serviço e rotas
let servicos = []
let proximoServicoId = 1

app.post("/servicos", (req, res) => {
    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = req.body
    if (!nome || !categoria || !duracao || preco === undefined) {
        return res.status(400).json({
            erro: "Nome, categoria, duração e preço são obrigatórios"
        })
    }

    const servico = {
        id: proximoServicoId++,
        nome,
        descricao,
        categoria,
        duracao,
        preco
    }
    servicos.push(servico)
    res.status(201).json(servico)
})
app.get("/servicos", (req, res) => {
    res.json(servicos)
})

app.get("/servicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const servico = servicos.find(
        servico => servico.id === id
    )

    if (!servico) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    res.json(servico)
})

app.put("/servicos/:id", (req, res) => {
    const id = Number(req.params.id)

    const servico = servicos.find(
        servico => servico.id === id
    )
    if (!servico) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = req.body

    servico.nome = nome
    servico.descricao = descricao
    servico.categoria = categoria
    servico.duracao = duracao
    servico.preco = preco
    res.json(servico)
})

app.delete("/servicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const indice = servicos.findIndex(
        servico => servico.id === id
    )
    if (indice === -1) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        })
    }

    servicos.splice(indice, 1);
    res.json({
        mensagem: "Serviço excluído com sucesso"
    })
})

//Entidade agendamento e rotas
let agendamentos = []
let proximoAgendamentoId = 1

app.post("/agendamentos", (req, res) => {
    const {
        clienteId,
        profissionalId,
        servicoId,
        data,
        hora
    } = req.body

    const cliente = clientes.find(
        cliente => cliente.id === Number(clienteId)
    )
    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado"
        })
    }

    const profissional = profissionais.find(
        profissional => profissional.id === Number(profissionalId)
    )
    if (!profissional) {
        return res.status(404).json({
            erro: "Profissional não encontrado"
        });
    }

    const servico = servicos.find(
        servico => servico.id === Number(servicoId)
    )
    if (!servico) {
        return res.status(404).json({
            erro: "Serviço não encontrado"
        });
    }
    const agendamento = {
        id: proximoAgendamentoId++,
        clienteId: Number(clienteId),
        profissionalId: Number(profissionalId),
        servicoId: Number(servicoId),
        data,
        hora,
        status: "pendente"
    }

    agendamentos.push(agendamento)
    res.status(201).json(agendamento)
})
app.get("/agendamentos", (req, res) => {
    res.json(agendamentos);
})

app.get("/agendamentos/:id", (req, res) => {
    const id = Number(req.params.id);
    const agendamento = agendamentos.find(
        agendamento => agendamento.id === id
    )
    if (!agendamento) {
        return res.status(404).json({
            erro: "Agendamento não encontrado"
        })
    }
    res.json(agendamento)
})

//conflito de horarios
const horarioOcupado = agendamentos.some(agendamento =>
    agendamento.profissionalId === Number(profissionalId) &&
    agendamento.data === data &&
    agendamento.hora === hora &&
    agendamento.status !== "cancelado"
)
if (horarioOcupado) {
    return res.status(400).json({
        erro: "Profissional já possui agendamento nesse horário"
    })
}
 //remarcar agendamento
app.put("/agendamentos/:id", (req, res) => {
    const id = Number(req.params.id);

    const agendamento = agendamentos.find(
        agendamento => agendamento.id === id
    )
    if (!agendamento) {
        return res.status(404).json({
            erro: "Agendamento não encontrado"
        });
    }

    const {
        clienteId,
        profissionalId,
        servicoId,
        data,
        hora
    } = req.body;

    const horarioOcupado = agendamentos.some(outro =>
        outro.id !== id &&
        outro.profissionalId === Number(profissionalId) &&
        outro.data === data &&
        outro.hora === hora &&
        outro.status !== "cancelado"
    )
    if (horarioOcupado) {
        return res.status(400).json({
            erro: "Profissional já possui agendamento nesse horário"
        });
    }

    agendamento.clienteId = Number(clienteId);
    agendamento.profissionalId = Number(profissionalId);
    agendamento.servicoId = Number(servicoId);
    agendamento.data = data;
    agendamento.hora = hora;
    res.json(agendamento);
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
})
