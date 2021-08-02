import {http} from './config'

export default{

    listar:(page = null, dimensao_id = null) => {
        if(dimensao_id){
            if(!page){            
                return http.get('perguntas/dimensao/'+dimensao_id)
            }else{
                return http.get(page);
            }
            
        }
        
        if(!page){
            return http.get('perguntas')
        }
        
        return http.get(page)
    },

    salvar:(pergunta) => {
        return http.post('perguntas',{descricao: pergunta.descricao, dimensao_id: pergunta.dimensao_id, ativo: true})
    },

    alterar:(pergunta) => {
        console.log(pergunta);
        return http.put('perguntas/'+pergunta.id, {descricao: pergunta.descricao, dimensao_id: pergunta.dimensao_id, ativo: pergunta.ativo})
    },

    apagar:(pergunta) => {
        return http.delete('perguntas/'+pergunta.id)
    },

    buscaPerguntaId: (pergunta) => {
        return http.get('perguntas/'+pergunta.id);           
       
    }
}