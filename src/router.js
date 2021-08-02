import { createWebHistory, createRouter } from "vue-router";
import Apresentacao from "@/views/apresentacao.vue";
import Dimensoes from "@/views/dimensoes.vue";
import DimensoesCadastro from "@/views/dimensoesCadastro.vue";
import Perguntas from "@/views/perguntas.vue";
import PerguntasCadastro from "@/views/perguntasCadastro.vue";



const routes = [
  {
    path: "/",
    name: "Apresentacao",
    component: Apresentacao,
  },
  {
    path: "/dimensoes",
    name: "Dimensoes",
    component: Dimensoes,
  },
  {
    path: "/dimensoes/cadastro",
    name: "DimensoesCadastro",
    component: DimensoesCadastro,
  },
  {
    path: "/perguntas",
    name: "Perguntas",
    component: Perguntas,
  },
  {
    path: "/perguntas/cadastro",
    name: "PerguntasCadastro",
    component: PerguntasCadastro,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;