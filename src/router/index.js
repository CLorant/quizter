import { createRouter, createWebHistory } from 'vue-router'
import Fooldal from '../views/Fooldal.vue'
import Profil from '../views/Profil.vue'
import Ranglista from '../views/Ranglista.vue'
import QuizBeallito from '../views/QuizBeallito.vue'

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
    //path: '/profil/:id',
    path: '/profil',
    name: 'profil',
    component: Profil
  },
  /*
  {
    path: /profil,
    name: bejelentkezettProfil,
    component: Profil
  },
  */
  {
    path: '/ranglista',
    name: 'ranglista',
    component: Ranglista
  },
  {
    path: '/quizbeallito',
    component: QuizBeallito
  },
  /*
  {
    path: '/quizbeallito/:id',
    name: 'quizbeallito',
    component: QuizBeallito
  },
  */
  {
    path: '/jatekmenet',
    name: 'jatekmenet',
    component: () => import('../views/Jatekmenet.vue')
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