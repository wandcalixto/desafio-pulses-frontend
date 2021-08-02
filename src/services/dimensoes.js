import {http} from './config'

export default{

    listar:() => {
        return http.get('dimensoes')
    },

    salvar:(dimensao) => {
        return http.post('dimensoes',dimensao)
    },

    alterar:(dimensao) => {
        return http.put('dimensoes/'+dimensao.id, dimensao)
    },

    apagar:(dimensao) => {
        return http.delete('dimensoes/'+dimensao.id)
    },

    buscaDimensaoId: (dimensao) => {
        var result = http.get('dimensoes/'+dimensao);    
        return result
    }
}