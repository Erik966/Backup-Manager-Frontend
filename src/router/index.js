import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import secure from '../views/secure.vue'
import settings from '../views/settings.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/secure',
    name: 'secure',
    component: secure
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
