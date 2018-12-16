// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Element from 'element-ui'
Vue.use(Element)
import 'element-ui/lib/theme-chalk/index.css';

import './assets/public.css'
import { DIYtoast } from './utils/tool'
Vue.prototype.$DIY = DIYtoast

// Vue.prototype.$url = 'https:/you1mei.com/uploads/'
import { Imgurl } from './utils/env'
Vue.prototype.$url = Imgurl

//global fn 
// import { VUE_GLOBAL } from './pub/public'
// Vue.use(VUE_GLOBAL)

import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
