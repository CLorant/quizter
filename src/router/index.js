import { createRouter, createWebHistory } from 'vue-router'
import Fooldal from '../views/Fooldal.vue'

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
    path: '/:pathMatch(.*)*',
    name: 'nem-talalt',
    component: () => import('../views/NemTalalt.vue')
  }
]

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
})

export default router