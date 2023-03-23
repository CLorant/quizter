import { createRouter, createWebHistory } from 'vue-router';
import Fooldal from '../views/Fooldal.vue';
import { useFelhasznaloStore } from '../stores/felhasznalo';

const adminGuard = (to, from, next) => {
  if (useFelhasznaloStore().felhasznalo.jogosultsag === "admin") {
    next();
  } else {
    next({ name: 'nem-talalt' });
  }
};

const routes = [
  {
    path: '/',
    name: 'fooldal',
    component: Fooldal
  },
  {
    path: '/rolunk',
    name: 'rolunk',
    component: () => import('../views/Rolunk.vue')
  },
  {
    path: '/profil/:userId',
    name: 'profil',
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/ranglista',
    name: 'ranglista',
    component: () => import('../views/Ranglista.vue')
  },
  {
    path: '/quizbeallito/:temaId',
    name: 'quizbeallito',
    component: () => import('../views/QuizBeallito.vue'),
  },
  {
    path: '/jatekmenet',
    name: 'jatekmenet',
    component: () => import('../views/Jatekmenet.vue'),
  },
  {
    path: '/bejelentkezes',
    name: 'bejelentkezes',
    component: () => import('../views/Bejelentkezes.vue')
  },
  {
    path: '/regisztracio',
    name: 'regisztracio',
    component: () => import('../views/Regisztracio.vue')
  },
  {
    path: '/kerdesek',
    name: 'kerdesek',
    component: () => import('../views/Kerdesek.vue'),
    beforeEnter: adminGuard
  },
  {
    path: '/kerdes/:kerdesId',
    name: 'kerdes',
    component: () => import('../views/Kerdes.vue'),
    beforeEnter: adminGuard
  },
  {
    path: '/uj-kerdes',
    name: 'uj-kerdes',
    component: () => import('../views/UjKerdes.vue'),
    beforeEnter: adminGuard
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nem-talalt',
    component: () => import('../views/NemTalalt.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  },
});

export default router;