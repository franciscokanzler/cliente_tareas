import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Registro from '../views/Registro.vue';
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }, // Ruta protegida, requiere autenticación
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registro', // Ruta para el registro de usuario
    name: 'registro',
    component: Registro,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirige a la página de inicio de sesión si no está autenticado
    next('/login');
  } else {
    next();
  }
});

export default router
