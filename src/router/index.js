import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

import { useAuthStore, useAlertStore } from '@/stores'
import authRoutes from './auth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { ...authRoutes },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach(async (to) => {
  const alertStore = useAlertStore()
  alertStore.clear()

  const publicPages = ['/account/signin', '/account/signup']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath
    return '/account/signin'
  }
})
