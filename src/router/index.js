import { createRouter, createWebHistory } from 'vue-router'
import Fooldal from '../views/Fooldal.vue'
import Profil from '../views/Profil.vue'
import Ranglista from '../views/Ranglista.vue'
import QuizBeallito from '../views/QuizBeallito.vue'
/*
const felhasznalo = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
      }
    )
  },
}

const tema = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
      }
    )
  },
}
*/
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
    path: '/profil/:nev',
    name: 'profil',
    component: Profil
  },
  {
    path: '/ranglista',
    name: 'ranglista',
    component: Ranglista
  },
  {
    path: '/quizbeallito/:id',
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