import Vue from 'vue'
import Router from 'vue-router'
import Homerouter from './home'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect:{path:'/page'}
    },
    {
      path: '/page',
      component: resolve => require(['@/components/common/page'], resolve),
      children:[...Homerouter]
    }
  ]
})
