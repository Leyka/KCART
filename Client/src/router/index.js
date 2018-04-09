import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

import Home from '@/views/Home'
import Login from '@/views/authentication/Login'
import Register from '@/views/authentication/Register'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// Set navigation guard
router.beforeEach((to, from, next) => {
  // Authentication required
  if (to.meta.requiresAuth) {
    if (store.state.userSignedIn) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
