
import {getCoinNames, getSearchList} from './../api/index'
export const Search = {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    total: 0,
    list: [],
    coinNames: [],
    loading: false,
    params: {
      coinName: '',
      type: 2
    }
  }),
  gets: {
  },
  actions: {
    getCoinNames ({ state, commit }, searchStr) {
      return getCoinNames({coinName: searchStr,type:1}).then(({data}) => {
        commit('setLoading', false)
        commit('setCoinNames', data)
      }).catch(() => {
        console.log('bug')
        commit('setLoading', false)
      })
    },
    getSearchList ({ state, commit }) {
      return getSearchList(state.params).then(({data}) => {
        commit('setLoading', false)
        commit('setList', data.list)
        commit('setCount', data.total)
      }).catch(() => {
        commit('setLoading', false)
      })
    },
    showList ({state, commit, dispatch}, coinName) {
      commit('setCoinName', coinName)
      dispatch('getSearchList')
    }

  },
  mutations: {
    setCoinNames (state, list) {
      state.coinNames = list
    },
    setCoinName (state, coinName) {
      state.params.coinName = coinName
    },
    setLoading (state, type) {
      state.loading = type
    },
    setList (state, list) {
      state.list.push(...list)
    },
    setCount (state, total) {
      state.total = total
    },
    resetList (state, total) {
      state.list = []
      state.params.pageindex = 0
    }
  }
}