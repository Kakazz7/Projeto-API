//Entidade PRofissional e rotas
let profissionais = []
let proximoProfissionalId = 1

//cadrasta um profissional
function criarProfissionais(dados) {
    const { nome, especialidade } = dados

    if (!nome || !especialidade) {
        return null
    }
    const profissional = {
        id: proximoProfissionalId++,
        nome,
        especialidade
    }

    profissionais.push(profissional);
    return profissional
}

//mostra todos os profissionais por lista 
function listarProfissionais(nome){
    let resultado = profissionais
    if(nome){
        resultado = profissionais.filter(profissionais.nome.toLowerCase().includes(nome.toLowerCase()))
    }   

    return resultado
}

//busca profissional especifico pelo id
function buscarProfissional(id){
   
    return profissionais.find(
        profissional => profissional.id === Number(id)
    )
}

//atualiza os dados de um profissional
function atualizarProfissionais(id, dados) {

    const profissional = buscarProfissional(id)

    if (!profissional) return null


    const { nome, especialidade } = dados
    profissional.nome = nome
    profissional.especialidade = especialidade

    return profissional
}

//remove um profissional listado
function excluirProfissioal(id) {
    const indice = profissionais.findIndex(
        profissional => profissional.id === Number(id)
    )

    if (indice === -1) return false

    profissionais.splice(indice, 1)
    return true

}

module.exports = {
    criarProfissional,
    listarProfissionais,
    buscarProfissional,
    atualizarProfissionais,
    excluirProfissioal
}