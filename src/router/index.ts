import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import BaseLayout from '../components/BaseLayout.vue';
import MyProfileView from '../views/MyProfileView.vue';
import UsersListView from '../views/user/UsersListView.vue';
import UserView from '../views/user/UserView.vue';
import UserAddView from '../views/user/UserAddView.vue';
import PersonView from '../views/person/PersonView.vue';
import PersonAddView from '../views/person/PersonAddView.vue';
import PersonsListView from '../views/person/PersonsListView.vue';
import ContactsListView from '../views/contact/ContactsListView.vue';
import ContactView from '../views/contact/ContactView.vue';
import { isAuthenticated } from '../services/authService';
import ContactAddView from '../views/contact/ContactAddView.vue';

const routes = [
  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: HomeView },
      { path: 'meu-cadastro', component: MyProfileView },
      { path: 'usuarios', component: UsersListView },
      { path: 'usuarios/:id', component: UserView },
      { path: 'adicionar-usuario', component: UserAddView },
      { path: 'pessoas', component: PersonsListView },
      { path: 'pessoas/:id', component: PersonView },
      { path: 'adicionar-pessoa', component: PersonAddView },
      { path: 'contatos', component: ContactsListView },
      { path: 'pessoas/:personId/contatos/:contactId', component: ContactView },
      { path: 'adicionar-contato', component: ContactAddView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
