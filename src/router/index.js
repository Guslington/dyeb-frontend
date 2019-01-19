import Vue from 'vue'
import Router from 'vue-router'
import Moment from 'vue-moment'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Competitions from '@/components/Competitions'
import Competition from '@/components/Competition'
import Beers from '@/components/Beers'
import Register from '@/components/Register'

import firebase from '@/firebase';

Vue.use(Router)
Vue.use(Moment);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/competitions',
      name: 'Competitions',
      component: Competitions,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id',
      name: 'Competition',
      component: Competition,
      meta: { requiresAuth: true }
    },
    {
      path: '/beers',
      name: 'Beers',
      component: Beers,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          next({ path: '/login' })
        } else {
          next()
        }
      });
    } else {
        next()
    }
})

export default router
