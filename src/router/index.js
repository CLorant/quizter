import { createRouter, createWebHistory } from 'vue-router'
import Fooldal from '../views/Fooldal.vue'
import Profil from '../views/Profil.vue'
import Ranglista from '../views/Ranglista.vue'
import QuizBeallito from '../views/QuizBeallito'

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
    path: '/profil',
    name: 'profil',
    component: Profil
  },
  {
    path: '/ranglista',
    name: 'ranglista',
    component: Ranglista
  },
  {
    path: '/quizbeallito',
    name: 'quizbeallito',
    component: QuizBeallito
  },
  {
    path: '/jatekmenet',
    name: 'jatekmenet',
    component: () => import('../views/Jatekmenet.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router