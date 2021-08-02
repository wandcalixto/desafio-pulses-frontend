<template>

  <div id="app">
    <div class="container">
        <br>
        <h3>{{titulo}}</h3>
        <form @submit.prevent="salvar" method="POST" >
            <div class="mb-3">
              <label for="nome" class="form-label">Nome da Pergunta</label>
              <input type="text" class="form-control" id="descricao" name="descricao" v-model="pergunta.descricao" required placeholder="Digite o nome da pergunta...">
            </div>
            <div class="mb-3">
              <label for="nome" class="form-label">Dimensão</label>
              <select name="dimensao" id="dimensao_id" class="form-select" v-model="pergunta.dimensao_id" required>              
                <option :value="dimensao.id" v-for="dimensao of dimensoes" :key="dimensao.id">{{dimensao.nome}}</option>
              </select>
            </div>
           <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar</button>&nbsp;
            <a href="../perguntas" class="btn btn-light"><i class="fas fa-ban"></i> Cancelar</a>
        </form>
    </div>
  </div>
</template>

<script>

import Pergunta from '../services/perguntas'
import Dimensao from '../services/dimensoes'

  export default {
    data(){
      return{
        pergunta: {
          id: '',
          descricao: '',
          dimensao_id: ''         
        },
        dimensoes: [],
        titulo:'Cadastro de Perguntas'
      }
    },
    mounted(){
     this.listarDimensoes();
      console.log(this.$route.params);
      if(this.$route.params.id){
          this.pergunta = this.$route.params;          
          this.titulo = 'Alterar Usuário';
      }
      
    },
    methods:{     
      listarDimensoes(){
        Dimensao.listar().then(resposta => {   
          this.dimensoes = resposta.data.data;
        });
      },
      salvar(){ 
        console.log(this.pergunta);
         if(!this.pergunta.id){       
            Pergunta.salvar(this.pergunta).then(resposta =>{
                alert('Salvo com Sucesso!');
                window.location.href="../perguntas";
            }).catch(e =>{
              alert('Ocorreu um erro ao salvar a pergunta!');
            });
        }else{
          Pergunta.alterar(this.pergunta).then(resposta =>{
              alert('Pergunta alterada com Sucesso!');
              window.location.href="../perguntas";
          }).catch(e =>{
            alert('Ocorreu um erro ao alterar a pergunta!');
          });
        }
      }
    }
}

</script>
<style>

</style>
