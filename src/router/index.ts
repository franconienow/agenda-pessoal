import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MeuCadastroView from "../views/MeuCadastroView.vue";
import UsuariosView from "../views/UsuariosView.vue";
import PessoasView from "../views/PessoasView.vue";
import ContatosView from "../views/ContatosView.vue";
import { isAuthenticated } from "../services/authService";
import BaseLayout from "../components/BaseLayout.vue";
import UsuarioSingleView from "../views/UsuarioSingleView.vue";

const routes = [
  { path: "/login", component: LoginView },
  {
    path: "/",
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: HomeView },
      { path: "meu-cadastro", component: MeuCadastroView },
      { path: "usuarios", component: UsuariosView },
      { path: "usuarios/:id", component: UsuarioSingleView },
      { path: "pessoas", component: PessoasView },
      { path: "contatos", component: ContatosView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
