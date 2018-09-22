/**
 * 
 * @authors jjk (jjk@example.org)
 * @date    2018-05-23 00:34:13
 * @version $Id$
 */
import {getCoinQuotation, getCoinInfo, getCoinInfoExtend, setCoinAlarm, setCollectCoin, setCancelCollect, setCancelAlarm} from './../api/index'
export const Details = {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    coinData: [],
    coinInfo: {},
    coinBase: {
      market: {}
    },
    coinExtend: {},
    loading: false
  }),
  gets: {
  },
  actions: {
    getCoinQuotation ({commit}, params) {
      return getCoinQuotation(params).then(({data}) => {
        if (data.code === 0) {
          commit('setCoinData', data.data)
        } else {
          console.log('error')
        }
      }).catch(() => {
        console.log('error')
      })
    },
    getCoinInfo ({commit}, params) {
      return getCoinInfo(params).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          commit('setCoinInfo', data.data)
        } else {
          console.log('error')
        }
      }).catch(() => {
        console.log('error')
      })
    },
    getCoinInfoExtend ({commit}, params) {
      return getCoinInfoExtend(params).then((data) => {
        console.log(data, 'setCoinExtend')
        if (data.cmd === '0') {
          commit('setCoinExtend', data.data)
        } else {
          console.log('error')
        }
      }).catch(() => {
        console.log('error')
      })
    },
    setCoinAlarm ({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        setCoinAlarm(params).then((data) => {
          commit('setLoading', false)
          dispatch('getCoinInfoExtend', {
            coinId: state.coinBase.coinId,
            baseCost: state.coinInfo.last
          })
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    setCollectCoin ({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        setCollectCoin(params).then((data) => {
          commit('setLoading', false)
          dispatch('getCoinInfoExtend', {
            coinId: state.coinBase.coinId,
            baseCost: state.coinInfo.last
          })
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    setCancelAlarm ({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        setCancelAlarm(params).then((data) => {
          commit('setLoading', false)
          dispatch('getCoinInfoExtend', {
            coinId: state.coinBase.coinId,
            baseCost: state.coinInfo.last
          })
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    },
    setCancelCollect ({state, commit, dispatch}, params) {
      return new Promise((resolve, reject) => {
        setCancelCollect(params).then((data) => {
          commit('setLoading', false)
          dispatch('getCoinInfoExtend', {
            coinId: state.coinBase.coinId,
            baseCost: state.coinInfo.last
          })
          resolve(data)
        }).catch(() => {
          commit('setLoading', false)
        })
      })
    }
  },
  mutations: {
    setCoinData (state, data) {
      console.log('Details.js')
      state.coinData = data
    },
    setCoinInfo (state, data) {
      state.coinInfo = data
    },
    setCoinBase (state, data) {
      state.coinBase = data
    },
    setCoinExtend (state, data) {
      state.coinExtend = data
    },
    setLoading (state, type) {
      state.loading = type
    },
  }
}
