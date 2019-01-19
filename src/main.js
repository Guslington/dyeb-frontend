import Vue from 'vue'
import App from '@/components/App'

import 'firebaseui/dist/firebaseui.css';

import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});