import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './utils/directives'
import { i18n } from './plugins/i18n'
import cookies from 'vue-cookies'

// mock
// import './mock'

import './core/use'
import bootstrap from './core/bootstrap'
import '@/permission' // permission control
import '@/utils/filter' // global filter


Vue.config.productionTip = false
Vue.prototype.cookies = cookies
// Vue.use(router)

new Vue({
  router,
  store,
  i18n,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
