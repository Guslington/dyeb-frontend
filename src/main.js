import Vue from 'vue'
import VueEvents from 'vue-events'
import UUID from 'vue-uuid';

import App from './App';
import router from './router';
import store from './store';
import './auth';

import 'firebaseui/dist/firebaseui.css';

Vue.use(VueEvents);
Vue.use(UUID);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
});
