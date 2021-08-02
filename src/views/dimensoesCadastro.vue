<template>

  <div id="app">
    <div class="container">
        <br>
        <h3>{{titulo}}</h3>
        <form @submit.prevent="salvar">
          <div class="mb-3">
              <label for="nome" class="form-label">Nome da Dimensão</label>
              <input type="text" class="form-control" id="nome" name="nome" aria-describedby="Nome" v-model="dimensao.nome" required>
            </div>
           <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar</button>&nbsp;
            <a href="../dimensoes" class="btn btn-light"><i class="fas fa-ban"></i> Cancelar</a>
        </form>
    </div>
  </div>
</template>

<script>
  import Dimensao from '../services/dimensoes'
  
  export default {
    data(){
      return{
        dimensao:{
          id: '',
          nome:''
        },
        titulo:'Cadastro de Dimensões'
      }
    },
    mounted(){
      console.log(this.$route.params);
      if(this.$route.params.id){
          this.dimensao = this.$route.params;
          this.titulo = 'Alterar Usuário';
      }
    },
    methods:{
      salvar(){
        if(!this.dimensao.id){
          Dimensao.salvar(this.dimensao).then(resposta =>{
              alert('Salvo com Sucesso!');            
              window.location.href="../dimensoes";
          }).catch(e =>{
            alert('Ocorreu um erro ao salvar a dimensão!');
          });
        }else{
          Dimensao.alterar(this.dimensao).then(resposta =>{
              alert('Dimensão alterada com Sucesso!');             
              window.location.href="../dimensoes";
          }).catch(e =>{
            alert('Ocorreu um erro ao alterar a dimensão!');
          });
        }
      }
    }
}


</script>
<style>

</style>
