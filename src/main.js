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
import requetePage from './components/RequetesPage.vue';
import structures from './components/admin_add/adress_page.vue';
import typeForm from './components/admin_add/type_fs.vue';
import type_acte from './components/admin_add/type_acte.vue';
import type_user from './components/admin_add/type_user.vue';
import approbation_stage from './components/admin_add/approbation_page.vue';
import serviceFonction from './components/admin_add/service_fonction.vue';
import processusPage from './components/processusPage.vue';
import affectationPage from './components/admin_add/affectation_page.vue';
import structureSanitaire from './components/admin_add/structure_sanitaire.vue';
import PersonnelDetails from './components/detail_personnel.vue';
import ProfilePage from './components/profil_page.vue';
import personnelPage from './components/personnel_page.vue';
import personnelPage2 from './components/personnel_page2.vue';
import side_bar from './components/includ/SideBar.vue';
import acceuilPage2 from './components/cheats/acceuilPage2.vue';
import acceuilPage3 from './components/cheats/acceuilPage3.vue';
import acceuilPage4 from './components/cheats/acceuilPage4.vue';
import acceuilPage5 from './components/cheats/acceuilPage5.vue';
import acceuilPage6 from './components/cheats/acceuilPage6.vue';
import acceuilPage7 from './components/cheats/acceuilPage7.vue';
import testSen from './components/testSen.vue';
import imprimerDetail from './components/imprimer_detail.vue';


const routes = [
  { path: '/CreateAccount', component: CreateAccount },
  { path: '/', component: LoadingPage },
  { path: '/auth', component: AuthentificationPage },
  { path: '/requetePage', component: requetePage },
  { path: '/ProfilePage', component: ProfilePage },
  { path: '/side_bar', component: side_bar },
  { path: '/testSen', component: testSen },
  { path: '/approbation_stage', component: approbation_stage },
  { path: '/imprimerDetail/:matricule', component: imprimerDetail },
  { path: '/PersonnelDetails/:matricule', component: PersonnelDetails },
  { path: '/personnelPage', component: personnelPage },
  { path: '/personnelPage2', component: personnelPage2 },
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
  { path: '/acceuilPage2', component: acceuilPage2 },
  { path: '/acceuilPage3', component: acceuilPage3 },
  { path: '/acceuilPage4', component: acceuilPage4 },
  { path: '/acceuilPage5', component: acceuilPage5 },
  { path: '/acceuilPage6', component: acceuilPage6 },
  { path: '/acceuilPage7', component: acceuilPage7 },
  { path: '/modifier-user/:userId?', component: modifierUser },
  { path: '/password-reset', component: PasswordReset, },
  { path: '/actePage', component: actePage },
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

