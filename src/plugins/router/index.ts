import { createRouter, createWebHashHistory } from '@ionic/vue-router'

import TabPage from '@/pages/TabPage.vue'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TabPage,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/HomePage.vue')
        },
        {
          path: 'service',
          component: () => import('@/pages/ServicePage.vue')
        },
        {
          path: 'account',
          component: () => import('@/pages/AccountPage.vue')
        }
      ]
    }
  ]
})
