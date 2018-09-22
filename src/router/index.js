/*
* @Author: jiangjian
* @Date:   2018-05-07 10:02:39
* @Last Modified by:   jiangjian
* @Last Modified time: 2018-06-26 23:13:20
*/
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./../components/Home.vue') },
      { path: '/search', component: () => import('./../components/Search.vue') },
      { path: '/details', component: () => import('./../components/Details.vue') },
      { path: '/login',
        component: () => import('./../components/Login.vue'),
        children: [{
          path: 'result',
          component: () => import('./../components/Login/Login-result.vue')
        }, {
          path: 'register',
          component: () => import('./../components/Login/Login-register.vue')
        }, {
          path: 'enter',
          component: () => import('./../components/Login/Login-enter.vue')
        }]
      }
    ]
  })
}
