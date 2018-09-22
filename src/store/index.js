import Vue from 'vue'
import Vuex from 'vuex'
import {Home} from './modules/Home.js'
import {Search} from './modules/Search.js'
import {Details} from './modules/Details.js'
import {Login} from './modules/Login.js'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
    },
    mutations: {
    },
    modules: {
      Home,
      Search,
      Details,
      Login
    }
  })
}
