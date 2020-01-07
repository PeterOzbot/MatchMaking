import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('../views/BoardUser.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router
