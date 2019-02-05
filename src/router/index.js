import Vue from 'vue'
import Router from 'vue-router'
import Moment from 'vue-moment'

import Home from '@/pages/Home';
import Competitions from '@/pages/Competitions';
import Competition from '@/pages/Competition';
import Register from '@/pages/Register';
import Scorecard from '@/pages/Scorecard';
import Profile from '@/pages/Profile';

import store from '@/store';

Vue.use(Router);
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
      path: '/register/:id',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: true }
    },
    {
      path: '/scorecard/:id',
      name: 'Scorecard',
      component: Scorecard,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.user.loggedIn) {
        next()
        return
      } else {
        store.dispatch('user/login')
      }
    } else {
        next()
    }
})

export default router
