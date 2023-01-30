import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fooldal',
      component: () => import('../components/fooldal/Fooldal.vue')
    },
    {
      path: '/rolunk',
      name: 'rolunk',
      component: () => import('../components/rolunk/Rolunk.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../components/profil/Profil.vue')
    },
    {
      path: '/ranglista',
      name: 'ranglista',
      component: () => import('../components/ranglista/Ranglista.vue')
    }
  ]
})

export default router