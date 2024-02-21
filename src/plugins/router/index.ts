import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
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
        component: () => import('@/pages/HomePage.vue')
      },
      {
        path: 'activity',
        component: () => import('@/pages/ActivityPage.vue')
      },
      {
        path: 'finance',
        component: () => import('@/pages/FinancePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
