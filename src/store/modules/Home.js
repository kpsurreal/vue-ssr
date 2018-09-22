
import {getHomeList, getCollectionList, getWarningList, setCoinAlarm, setCancelAlarm} from './../api/index'
export const Home = {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    total: 99,
    list: [],
    params: {
      sort: 2,
      pagesize: 10,
      pageindex: -1,
      top: -1,
      order: 2
    },
    loading: false,
    tabIndex: 'coins',
    tabList: {
      coins: '币行情',
      collection: '我的收藏',
      warning: '我的预警'
    }
  }),
  gets: {
  },
  actions: {
    getList ({state, dispatch, commit}) {
      state.params.pageindex++
      commit('setLoading', true)
      if (state.tabIndex === 'coins') {
        dispatch('getHomeList')
      }
      if (state.tabIndex === 'collection') {
        dispatch('getCollectionList')
      }
      if (state.tabIndex === 'warning') {
        dispatch('getWarningList')
      }
    },
    getHomeList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getHomeList(state.params).then(({data}) => {
          commit('setLoading', false)
          if (data.cmd === '0') {
            commit('setList', data.data.list)
            commit('setCount', data.data.total)
          } else {
            state.total = 0
          }
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    getCollectionList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getCollectionList({}).then(({data}) => {
          commit('setLoading', false)
          if (data.cmd === '0') {
            commit('setList', data.data.list)
            commit('setCount', data.data.total)
          } else {
            state.total = 0
          }
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    getWarningList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getWarningList({}).then(({data}) => {
          commit('setLoading', false)
          if (data.cmd === '0') {
            commit('setList', data.data.list)
            commit('setCount', data.data.total)
          } else {
            state.total = 0
          }
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    setCoinAlarm ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        setCoinAlarm(params).then((data) => {
          commit('setLoading', false)
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    setCancelAlarm ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        setCancelAlarm(params).then((data) => {
          commit('setLoading', false)
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    // getListWithSort ({state, commit, dispatch}, sort) {
    //   commit('setSort', sort)
    //   commit('resetList')
    // }
  },
  mutations: {
    setList (state, list) {
      state.list.push(...list)
    },
    setCount (state, total) {
      state.total = total
    },
    changeTab (state, index) {
      state.tabIndex = index
    },
    resetList (state, total) {
      state.list = []
      state.params.pageindex = -1
      state.total = 99
    },
    setLoading (state, type) {
      state.loading = type
    },
    setSort (state, sort) {
      if (sort === state.params.sort) {
        console.log(state.params.sort, sort)
        if (state.params.order === '-1') {
          state.params.order = '1'
        } else if (state.params.order === '1') {
          state.params.order = '2'
        } else {
          state.params.order = '-1'
        }
      } else {
        state.params.sort = sort
        state.params.order = '1'
      }
    },
    setTop (state, top) {
      state.params.top = top
    }
  }
}
