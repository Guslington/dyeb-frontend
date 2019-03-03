import Vue from 'vue'
import Router from 'vue-router'
import Moment from 'vue-moment'

import Home from '@/pages/home';
import Profile from '@/pages/profile';

import List from '@/pages/competition/list';
import Show from '@/pages/competition/show';
import New from '@/pages/competition/new';
import Edit from '@/pages/competition/edit';
import Beers from '@/pages/competition/beers';
import Results from '@/pages/competition/results';
import Register from '@/pages/competition/register';
import Scorecard from '@/pages/competition/scorecard';

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
      name: 'List',
      component: List,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id',
      name: 'Show',
      component: Show,
      props: true ,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id/scorecard',
      name: 'Scorecard',
      component: Scorecard,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/new',
      name: 'New',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id/edit',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id/beers',
      name: 'Beers',
      component: Beers,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id/results',
      name: 'Results',
      component: Results,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
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
