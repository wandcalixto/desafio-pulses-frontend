<template>

  <div id="app">
    
    
    <div class="container">
      <br>
           
      <table  class="table table-hover">
        
        <thead>
          <tr>
            <th class="status" colspan="2"><h3>Perguntas</h3></th>
             <th class="filtro" >
                <select name="dimensao" id="dimensao_id" class="form-select selectDimensao" @change="listar()" v-model="dimensao_id">
                    <option selected value="">Selecione um filtro...</option> 
                   <option :value="dimensao.id" v-for="dimensao of dimensoes" :key="dimensao.id">{{dimensao.nome}}</option>
                </select>
             </th>
            <th class="acoes">           
            <router-link :to="{name: 'PerguntasCadastro'}" tag="button" class="btn btn-primary"><i class="fas fa-plus"></i> Criar Pergunta</router-link></th>
          </tr>
          <tr>
            <th class="status">STATUS</th>
            <th class="dimensao">DIMENSÃO</th>
            <th class="pergunta">NOME DA PERGUNTA</th>
            <th class="acoes">AÇÕES</th>
          </tr>

        </thead>

        <tbody>
            
          <tr v-for="pergunta of perguntas" :key="pergunta.id">
        
            <td class="status"><input type="checkbox" class="custom-control-input active" :checked="pergunta.ativo" id="status" @click="alteraStatus({id: pergunta.id, descricao: pergunta.descricao, ativo: pergunta.ativo, dimensao_id: pergunta.dimensao.id})"></td>
            <td class="dimensao">{{pergunta.dimensao.nome}}</td>
            <td class="pergunta">{{pergunta.descricao}}</td>
            <td class="acoes">
              <router-link :to="{name: 'PerguntasCadastro', params: {id: pergunta.id, descricao: pergunta.descricao, ativo: pergunta.ativo, dimensao_id: pergunta.dimensao.id}}" tag="button" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i> Editar</router-link> &nbsp;
              <button @click="excluir(pergunta)" class="btn btn-danger btn-sm" cli><i class="fas fa-trash-alt"></i> Excluir </button>
            </td>
          </tr>

        </tbody>
      
      </table>
      <nav aria-label="Paginação">
        <ul class="pagination">
          <li class="page-item" :class="{ 'active': pagina.active }" v-for="pagina of paginacao" :key="pagina.label" @click="listar(pagina.url)"><a class="page-link" href="#">{{pagina.label}}</a></li>       
          
        </ul>
      </nav>

    </div>

  </div>
</template>

<script>
import Pergunta from '../services/perguntas'
import Dimensao from '../services/dimensoes'


export default{
  data(){
    return {
      perguntas:  [],
      paginacao:  [],
      dimensoes:  [],
      dimensao_id:''
    }
  },
  mounted(){
    this.listar();
    this.listarDimensoes();
  },
  methods:{
    listar(link){
    
        Pergunta.listar(link, this.dimensao_id).then(resposta => {
        
          this.perguntas = resposta.data.data;
          this.paginacao = resposta.data.meta.links;
          
          this.paginacao.forEach(pagina => {
            if(pagina.label == "&laquo; Previous"){
              pagina.label = '<<';
            }
             if(pagina.label == "Next &raquo;"){
              pagina.label = '>>';
            }
          });
        });
        
    },
    excluir(pergunta){
    
      if(confirm('Deseja realmente excluir a Pergunta?')){
      
          Pergunta.apagar(pergunta).then(resposta =>{
              alert('Pergunta excluída com Sucesso!');
              this.listar();
          }).catch(e =>{
            alert('Ocorreu um erro ao excluir a Pergunta!');
          });
          
      }
    },
    alteraStatus(pergunta){
    
      if(pergunta.ativo){
        pergunta.ativo = false;
      }else{
         pergunta.ativo = true;
      }
      
      Pergunta.alterar(pergunta);
      
    },
    listarDimensoes(){
      
      Dimensao.listar().then(resposta => {   
        this.dimensoes = resposta.data.data;
      });
      
    }
    
  }
}
</script>

<style>

.status {
    width: 10%;
}
.dimensao {
    width: 20%;
}
.pergunta {
    width: 50%;
}
.acoes {
    width: 20%;
}
.selectDimensao{
  width: 50%;
}
.filtro{
  /* display: inline; */
  text-align: right;
}
</style>
