import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import CreateAccount from '@/components/CreateAccount.vue';
import AuthentificationPage from '@/components/AuthentificationForm.vue';
import offrePage from '@/components/offrePage.vue';
import LoadingPage from './components/LoadingPage.vue';
import acceuilPage from './components/acceuilPage.vue';
import modifierUser from './components/modifierUser.vue';
import actePage from './components/actePage.vue';
import PasswordReset from './components/ForgotPassword.vue';
import realisationsPage from './components/realisationsPage.vue';
import structures from './components/admin_add/adress_page.vue';
import typeForm from './components/admin_add/type_fs.vue';
import type_acte from './components/admin_add/type_acte.vue';
import type_user from './components/admin_add/type_user.vue';
import serviceFonction from './components/admin_add/service_fonction.vue';
import processusPage from './components/processusPage.vue';
import affectationPage from './components/admin_add/affectation_page.vue';
import structureSanitaire from './components/admin_add/structure_sanitaire.vue';
import PersonnelDetails from './components/detail_personnel.vue';
import personnelPage from './components/personnel_page.vue';
const routes = [
  { path: '/CreateAccount', component: CreateAccount },
  { path: '/', component: LoadingPage },
  { path: '/auth', component: AuthentificationPage },
  { path: '/PersonnelDetails/:matricule', component: PersonnelDetails },
  { path: '/personnelPage', component: personnelPage },
  { path: '/affectationPage', component: affectationPage },
  { path: '/structures', component: structures },
  { path: '/structureSanitaire', component: structureSanitaire },
  { path: '/processusPage', component: processusPage },
  { path: '/typeForm', component: typeForm },
  { path: '/serviceFonction', component: serviceFonction },
  { path: '/type_user', component: type_user },
  { path: '/type_acte', component: type_acte },
  { path: '/offrePage', component: offrePage },
  { path: '/realisationsPage', component: realisationsPage },
  { path: '/acceuilPage', component: acceuilPage },
  {
    path: '/modifier-user/:userId?',
    name: 'modifierUser',
    component: modifierUser
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PasswordReset,
  },
  { path: '/actePage', component: actePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

