const AgendamentoModel = require("../Models/AgendamentoModel.js");
const ClienteModel = require("../Models/ClienteModel.js");
const ProfissionalModel = require("../Models/ProfissionalModel.js");
const ServicoModel = require("../Models/ServicoModel.js");
const { ObjectId } = require("mongodb");

// Verifica se o ID é válido
function idValido(id) {
    return ObjectId.isValid(id);
}

// Cria um agendamento
async function criarAgendamento(dados) {
    const {
        clienteId,
        profissionalId,
        servicoId,
        data,
        hora
    } = dados;

    if (!idValido(clienteId) || !idValido(profissionalId) || !idValido(servicoId)) {
        return {
            erro: "ID inválido",
            status: 400
        };
    }

    const cliente = await ClienteModel.buscarPorId(clienteId);

    if (!cliente) {
        return {
            erro: "Cliente não encontrado",
            status: 404
        };
    }

    const profissional = await ProfissionalModel.buscarPorId(profissionalId);

    if (!profissional) {
        return {
            erro: "Profissional não encontrado",
            status: 404
        };
    }

    const servico = await ServicoModel.buscarPorId(servicoId);

    if (!servico) {
        return {
            erro: "Serviço não encontrado",
            status: 404
        };
    }

    // Verifica conflito de horários
    const agendamentos = await AgendamentoModel.buscarTodas();

    const horarioOcupado = agendamentos.some(agendamento =>
        agendamento.profissionalId === String(profissionalId) &&
        agendamento.data === data &&
        agendamento.hora === hora &&
        agendamento.status !== "cancelado"
    );

    if (horarioOcupado) {
        return {
            erro: "Profissional já possui agendamento nesse horário",
            status: 400
        };
    }

    const agendamento = {
        clienteId: String(clienteId),
        profissionalId: String(profissionalId),
        servicoId: String(servicoId),
        data,
        hora,
        status: "pendente"
    };

    const resultado = await AgendamentoModel.inserir(agendamento);

    return {
        _id: resultado.insertedId,
        ...agendamento
    };
}

// Lista todos os agendamentos
async function listarAgendamentos() {
    return await AgendamentoModel.buscarTodas();
}

// Busca um agendamento pelo ID
async function buscarAgendamento(id) {
    if (!idValido(id)) return null;

    return await AgendamentoModel.buscarPorId(id);
}

// Atualiza ou remarca um agendamento
async function atualizarAgendamento(id, dados) {
    const agendamento = await buscarAgendamento(id);

    if (!agendamento) {
        return {
            erro: "Agendamento não encontrado",
            status: 404
        };
    }

    const {
        clienteId,
        profissionalId,
        servicoId,
        data,
        hora
    } = dados;

    if (!idValido(clienteId) || !idValido(profissionalId) || !idValido(servicoId)) {
        return {
            erro: "ID inválido",
            status: 400
        };
    }

    if (!await ClienteModel.buscarPorId(clienteId)) {
        return {
            erro: "Cliente não encontrado",
            status: 404
        };
    }

    if (!await ProfissionalModel.buscarPorId(profissionalId)) {
        return {
            erro: "Profissional não encontrado",
            status: 404
        };
    }

    if (!await ServicoModel.buscarPorId(servicoId)) {
        return {
            erro: "Serviço não encontrado",
            status: 404
        };
    }

    // Verifica conflito de horários
    const agendamentos = await AgendamentoModel.buscarTodas();

    const horarioOcupado = agendamentos.some(outro =>
        outro._id.toString() !== id.toString() &&
        outro.profissionalId === String(profissionalId) &&
        outro.data === data &&
        outro.hora === hora &&
        outro.status !== "cancelado"
    );

    if (horarioOcupado) {
        return {
            erro: "Profissional já possui agendamento nesse horário",
            status: 400
        };
    }

    await AgendamentoModel.atualizar(id, {
        clienteId: String(clienteId),
        profissionalId: String(profissionalId),
        servicoId: String(servicoId),
        data,
        hora
    });

    return await buscarAgendamento(id);
}

// Cancela um agendamento
async function cancelarAgendamento(id) {
    const agendamento = await buscarAgendamento(id);

    if (!agendamento) {
        return null;
    }

    await AgendamentoModel.atualizar(id, {
        status: "cancelado"
    });

    return await buscarAgendamento(id);
}

// Altera o status do agendamento
async function alterarStatus(id, status) {
    const agendamento = await buscarAgendamento(id);

    if (!agendamento) {
        return {
            erro: "Agendamento não encontrado",
            status: 404
        };
    }

    const statusValidos = [
        "pendente",
        "confirmado",
        "concluido",
        "cancelado"
    ];

    if (!statusValidos.includes(status)) {
        return {
            erro: "Status inválido",
            status: 400
        };
    }

    await AgendamentoModel.atualizar(id, {
        status
    });

    return await buscarAgendamento(id);
}

module.exports = {
    criarAgendamento,
    listarAgendamentos,
    buscarAgendamento,
    atualizarAgendamento,
    cancelarAgendamento,
    alterarStatus
};
