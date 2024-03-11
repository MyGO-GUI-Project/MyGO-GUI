import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router'

import TabPage from '@/pages/TabPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabPage,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: 'activity',
        component: () => import('@/pages/ActivityPage.vue'),
      },
      {
        path: 'finance',
        component: () => import('@/pages/FinancePage.vue'),
      },
      {
        path: 'search',
        component: () => import('@/pages/SearchPage.vue'),
      },
      {
        path: 'login',
        component: () => import('@/pages/LoginPage.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
