//Entidade Serviço e rotas
let servicos = []
let proximoServicoId = 1

//cadrasta um servico. ex:corte de cabelo
function criarServico(dados) {
    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = dados
    if (!nome || !categoria || !duracao || preco === undefined) {
        return null
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
    return servico
}

//lista todos os servicos cadrastados
function listarServicos(nome, categoria){
    let resultado = servicos
       
    if(nome){
        resultado.resultado.filter(servico => servico.categoria.toLowerCase().includes(categoria.toLowerCase()))
    }

    return resultado
}

//busca servico especifico pelo id
function buscarServico(id) {

    return servicos.find(
        servico => servico.id === Number(id)
    )
}

//altera as informacoes dos servicos
function atualizarServicos(id, dados) {
    const servico = buscarServico(id)

    if (!servico) return null

    const {
        nome,
        descricao,
        categoria,
        duracao,
        preco
    } = dados

    servico.nome = nome
    servico.descricao = descricao
    servico.categoria = categoria
    servico.duracao = duracao
    servico.preco = preco
    
    return servico
}

//remove um servico
function excluirServico(id) {
    const indice = servicos.findIndex(
        servico => servico.id === Number(id)
    )
    if (indice === -1) return false

    servicos.splice(indice, 1) 
    return true
}

module.exports = {
    criarServico,
    listarServicos,
    buscarServico,
    atualizarServicos,
    excluirServico
}