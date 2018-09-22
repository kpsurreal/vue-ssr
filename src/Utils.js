/*
* @Author: jiangjian
* @Date:   2018-05-16 23:03:08
* @Last Modified by:   jiangjian
* @Last Modified time: 2018-06-16 18:10:48
*/
import axios from 'axios'
import qs from 'qs'

// const configPath = 'http://112.74.162.209/LuCoinSuper'
const configPath = '/LuCoinSuper'
// const configPath = 'http://www.lucoins.cn/LuCoinSuper'
// const configPath = ''
export const Utils = {
  setAxiosConfig (obj) {
    localStorage.setItem('user', JSON.stringify(obj))
  },
  getAxiosConfig () {
    let User = localStorage.getItem('user') || ''
    if (User) {
      User = JSON.parse(User)
    }
    return {
      headers: {
        'version': '',
        'userId': User.userId || '',
        'sessionid': '',
        'device': ''
      },
      timeout: 1000,
      responseType: 'json'
    }
  },
  get (params, url) {
    url = configPath + url
    let config = this.getAxiosConfig()
    return new Promise((resolve, reject) => {
      console.log('1111111')
      axios.get(url, {
        params: params
      }, config)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (response) {
          console.log(response)
          console.log('接口异常')
        })
    })
  },
  post (params, url) {
    console.log(params)
    url = configPath + url
    let config = this.getAxiosConfig()
    return new Promise((resolve, reject) => {
      axios.post(url,
        qs.stringify(params)
        , config)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (response) {
          console.log(response)
          console.log('接口异常')
        })
    })
  },
  kLintepost (params, url) {
    console.log(params)
    url = 'api/v1' + url
    return new Promise((resolve, reject) => {
      axios.get(url, {params})
        .then(function (response) {
          resolve(response)
        })
        .catch(function (response) {
          console.log(response)
          console.log('接口异常')
        })
    })
  }
}
