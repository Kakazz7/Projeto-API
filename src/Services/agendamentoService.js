const clienteService = require("src/Services/clienteService.js")
const profissionalService = require("src/Services/profissionaisService.js")
const servicoService = require("src/Services/servicosService.js")

//Entidade agendamento e rotas
let agendamentos = []
let proximoAgendamentoId = 1

//cria um agendamento e verifica se a vaga esta ocupada naquele horario
function criarAgendamento(dados) {
    const {
        clienteId,
        profissionalId,
        servicoId,
        data,
        hora
    } = dados

    const cliente = clienteService.buscarCliente(clienteId)
    if (!cliente) {
        return {
            erro: "Cliente não encontrado",
            status: 404
        }
    }

    const profissional = profissionalService.buscarProfissional(profissionalId)
    if (!profissional) {
        return {
            erro: "Profissional não encontrado",
            status: 404
        }
    }

    const servico = servicoService.buscarServico(servicoId)

    if (!servico) {
       return {
            erro: "Servico não encontrado",
            status: 404
        }

        //conflito de horarios
//verifica se o profissional possui um agendamento na mesma data 
const horarioOcupado = agendamentos.some(agendamento =>
    agendamento.profissionalId === Number(profissionalId) &&
    agendamento.data === data &&
    agendamento.hora === hora &&
    agendamento.status !== "cancelado"
)

if (horarioOcupado) {
    return {
        erro: "Profissional já possui agendamento nesse horário",
        status: 400
    }
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
    return agendamento
}


//mostra todos agendamentos ja cadrastados
function listarAgendamentos(){
    return agendamentos
}
//busca um agendamento especifico pelo id 
function buscarAgendamento(id){
    return agendamentos.find(
        agendamento => agendamento.id === Number(id)
    )
}

//remarcar agendamento 
 //altera dados de agendamento como cliente, profissional, data, servico
function atualizarAgendamento(id, dados){
const agendamento = buscarAgendamento(id)

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
    } = dados

    if(!clienteService.buscarCliente(clienteId)){
        return {
            erro: "Cliente não encontrado",
            status: 404
        }
    }

    if(!profissionalService.buscarProfissional(profissionalId)){
        return {
            erro: "Profissional não encontrado",
            status: 404
        }
    }

    if(!servicoService.buscarServico(servicoIdId)){
        return {
            erro: "Serviço não encontrado",
            status: 404
        }
    }

    const horarioOcupado = agendamentos.some(outro =>
        outro.id !== id &&
        outro.profissionalId === Number(profissionalId) &&
        outro.data === data &&
        outro.hora === hora &&
        outro.status !== "cancelado"
    )

    if (horarioOcupado) {
        return {
            erro: "Profissional já possui agendamento nesse horário",
            status: 400
        }
    }

    agendamento.clienteId = Number(clienteId);
    agendamento.profissionalId = Number(profissionalId);
    agendamento.servicoId = Number(servicoId);
    agendamento.data = data;
    agendamento.hora = hora;
    return agendamento
} 
}

//cancelar agendamento
// muda status para cancelados
function cancelarAgendamento(id){
    const agendamento = buscarAgendamento(id)

    if (!agendamento) {
        return null

    agendamento.status = "cancelado";
    
    return agendamento
}
}


//status do agendamento
//altera somente os status do agendamento
function alterarStatus(id,  status) {
    const agendamento = buscarAgendamento(id)

    if (!agendamento) {
        return {
            erro: "Agendamento não encontrado",
            status: 404
        }
    }

    const statusValidos = [
        "pendente",
        "confirmado",
        "concluido",
        "cancelado"
    ]
    if (!statusValidos.includes(status)) {
        return {
            erro: "Status inválido",
            status: 400
        }
    }

    agendamento.status = status;
    return agendamento
}

module.exports = {
    criarAgendamento,
    listarAgendamentos,
    buscarAgendamento,
    atualizarAgendamento,
    cancelarAgendamento,
    alterarStatus
}
