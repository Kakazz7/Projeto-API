//Entidade Clientes e rotas
let clientes = []
let proximoClienteId = 1

//cadrastra um novo cliente obrigatoriamente com nome, email,telefone
function criarCliente(dados) {
    const { nome, email, telefone } = dados

    if (!nome || !email || !telefone) {
        return null
    }

    const cliente = {
        id: proximoClienteId++,
        nome,
        email,
        telefone
    }

    clientes.push(cliente);
    return cliente
};

//mostra todos clientes ja cadrastados como lista
function listarClientes(){
    return clientes
};

 //busca cliente especifico pelo id
function buscarClientes(id) {
    return clientes.find(
        cliente => cliente.id === Number(id)
    )
}

//altera daddos do cliente ja cadrastado
function atualizarCliente(id, dados){
    const cliente = buscarClientes(id)
    if (!cliente) return null
    const { nome, email, telefone } = dados

    cliente.nome = nome
    cliente.email = email
    cliente.telefone = telefone

    return cliente
}

//remove o cliente cadrastado
function excluirCliente(id){
    const indice = clientes.findIndex(
        cliente => cliente.id === Number(id)
    );

    if (indice === -1) {
        return false
    }

    clientes.splice(indice, 1)
    return true
}

module.exports = {
    criarCliente,
    listarCliente,
    bucarCliente,
    atualizarCliente,
    excluirCliente,
}