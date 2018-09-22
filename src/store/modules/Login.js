/**
 *
 * @authors jjk (jjk@example.org)
 * @date    2018-05-23 00:34:13
 * @version $Id$
 */

import {userLogin, userReg, getUserInfo, userLogout} from './../api/index'
export const Login = {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    tittle: '',
    params: {
      userName: '',
      phoneNum: '',
      password: ''
    },
    setLoading: false
  }),
  gets: {
  },
  actions: {
    userLogin ({ state, commit }) {
      return new Promise((resolve, reject) => {
        userLogin(state.params).then((data) => {
          console.log(data)
          resolve(data)
        }).catch(() => {
          // reject()
        })
      })
    },
    userReg ({ state, commit }) {
      return new Promise((resolve, reject) => {
        userReg(state.params).then((data) => {
          console.log(data)
          resolve(data)
        }).catch(() => {
          // reject()
        })
      })
    },
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.params).then((data) => {
          console.log(data)
          resolve(data)
        }).catch(() => {
          // reject()
        })
      })
    },
    userLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        userLogout().then((data) => {
          console.log(data)
          resolve(data)
        }).catch(() => {
          // reject()
        })
      })
    }
  },
  mutations: {
    setUserName (state, name) {
    }
  }
}
