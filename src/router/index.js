import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import {auth} from "../firebase/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        auth:true,
      }
    },
  ]
});

const currentUser = () => {
  return new Promise((resolve,reject) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener();
      resolve(user)
    },
    reject
    )
  })
}
router.beforeEach(async (to,from,next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next()
    } else {
      next("/")
    }
  } else {
    next()
  }
})
export default router
