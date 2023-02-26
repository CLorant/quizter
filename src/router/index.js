import { createRouter, createWebHistory } from 'vue-router'
import Fooldal from '../views/Fooldal.vue'
import { useQuizBeallitoStore } from '../stores/stores'

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
  /*
  {
    path: '/profil/:id',
    name: 'profil',
    component: Profil
  },
  */
  {
    path: '/profil',
    name: 'bejelentkezettProfil',
    component: () => import('../views/Profil.vue')
  },
  
  {
    path: '/ranglista',
    name: 'ranglista',
    component: () => import('../views/Ranglista.vue')
  },
  {
    path: '/quizbeallito',
    name: 'quizbeallito',
    component: () => import('../views/QuizBeallito.vue'),
  },
  {
    path: '/jatekmenet',
    name: 'jatekmenet',
    component: () => import('../views/Jatekmenet.vue'),
    beforeEnter(from, to){
      const store = useQuizBeallitoStore();
      if(store.kitoltott===false){
        return to
      }
    }
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