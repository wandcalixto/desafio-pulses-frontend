<template>

  <div id="app">
    
    
    <div class="container">
      <br>

      <table  class="table table-hover">

        <thead>
          <tr>
            <th class="nome"><h3>Dimensões</h3></th>
            <th class="acoes"><router-link :to="{name: 'DimensoesCadastro'}" tag="button" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Criar Dimensão</router-link></th>
          </tr>
          <tr>
            <th class="nome">NOME</th>
            <th class="acoes">AÇÕES</th>
          </tr>

        </thead>

        <tbody>
          <tr v-for="dimensao of dimensoes" :key="dimensao.id">
        
            <td class="nome">{{ dimensao.nome }}</td>
            <td class="acoes">
              <router-link :to="{name: 'DimensoesCadastro', params: {id: dimensao.id, nome: dimensao.nome}}" tag="button" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i> Editar</router-link> &nbsp;
              <button @click="excluir(dimensao)" class="btn btn-danger btn-sm"  cli><i class="fas fa-trash-alt"></i> Excluir </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Dimensao from '../services/dimensoes'
import Pergunta from '../services/perguntas'

export default{
  data(){
    return {
      dimensoes: [],
      perguntas: ''
    }
  },
  mounted(){
    this.listar();
  },
  methods:{
    listar(){
        Dimensao.listar().then(resposta => {
          this.dimensoes = resposta.data.data;
        });
    },
    excluir(dimensao){
      
       Pergunta.listar(null, dimensao.id).then(resposta => {

        if(!resposta.data.data.length){
          if(confirm('Deseja realmente excluir a Dimensão?')){
              Dimensao.apagar(dimensao).then(resposta =>{
                  alert('Dimensão excluída com Sucesso!');
                  this.listar();
              }).catch(e =>{
                alert('Ocorreu um erro ao excluir a Dimensão!');
              });          
          }
        }else{
          alert("Para excluir essa dimensão é necessário remover as perguntas associadas!");
        }
          
      });
    }
  }
}

</script>

<style>
.nome {
    width: 75%;
}
.acoes {
    width: 25%;
}

</style>
