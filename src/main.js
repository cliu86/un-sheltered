import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

import { sync } from 'vuex-router-sync'
sync(store, router)

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-117407687-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

Vue.config.productionTip = false
Vue.prototype.$appName = 'UN-SHELTERED'
Vue.use(Vuetify)

window._ = require('lodash')
window.axios = require('axios')
window.moment = require('moment')

router.beforeEach( ( to, from, next ) => {
  store.dispatch( 'closeSidebar' );
  next();
} );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
