/*
* @Author: jiangjian
* @Date:   2018-05-09 20:42:45
* @Last Modified by:   jiangjian
* @Last Modified time: 2018-06-27 00:37:01
*/

import {Utils} from './../../Utils'
// import './../mockjs'
// demo
export function fetchItem (params) {
  return new Promise((resolve, reject) => {
    const url = 'fetchItem'
    Utils.get(params, url).then((res) => {

    }).catch((res) => {

    })
  })
}
// 获取主页币列表
export function getHomeList (params) {
  return new Promise((resolve, reject) => {
    const url = '/GetCoinList'
    Utils.post(params, url).then((res) => {
      resolve(res)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 获取收藏币列表
export function getCollectionList (params) {
  return new Promise((resolve, reject) => {
    const url = '/GetCollectCoin'
    Utils.post(params, url).then((res) => {
      resolve(res)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 获取预警列表
export function getWarningList (params) {
  return new Promise((resolve, reject) => {
    const url = '/GetAlarmList'
    Utils.post(params, url).then((res) => {
      resolve(res)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 获取币名称联想输入
export function getCoinNames (params) {
  return new Promise((resolve, reject) => {
    const url = '/SearchCoin'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}// 获取搜索币列表
export function getSearchList (params) {
  return new Promise((resolve, reject) => {
    const url = '/SearchCoin'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}

// export function getCoinQuotation (params) {
//   console.log('get')
//   params = params || 'bitcoin'
//   return new Promise((resolve, reject) => {
//     const url = '/coinhisdata/' + params + '/'
//     Utils.post(params, url).then((res) => {
//       resolve(res)
//     }).catch((res) => {
//       console.log(res)
//       reject(res)
//     })
//   })
// }
export function getCoinQuotation (params) {
  console.log('get')
  return new Promise((resolve, reject) => {
    let url = '/kline'
    Utils.kLintepost(params, url).then((res) => {
      resolve(res)
    }).catch((res) => {
      console.log(res)
      reject(res)
    })
  })
}
export function getCoinInfo (params) {
  return new Promise((resolve, reject) => {
    let url = '/ticker'
    Utils.kLintepost(params, url).then((res) => {
      resolve(res)
    }).catch((res) => {
      console.log(res)
      reject(res)
    })
  })
}
// 注册
export function userReg (params) {
  return new Promise((resolve, reject) => {
    const url = '/RegistUser'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 登入
export function userLogin (params) {
  return new Promise((resolve, reject) => {
    const url = '/LoginUser'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
export function userLogout (params) {
  return new Promise((resolve, reject) => {
    const url = '/LogoutUser'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 获取用户信息
export function getUserInfo (params) {
  return new Promise((resolve, reject) => {
    const url = '/GetUserInfo'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 设置币预警
export function setCoinAlarm (params) {
  return new Promise((resolve, reject) => {
    const url = '/SetCoinAlarm'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 取消预警
export function setCancelAlarm (params) {
  return new Promise((resolve, reject) => {
    const url = '/CancelAlarm'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
export function getCoinInfoExtend (params) {
  return new Promise((resolve, reject) => {
    const url = '/GetCoinInfo'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 收藏
export function setCollectCoin (params) {
  return new Promise((resolve, reject) => {
    const url = '/CollectCoin'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}
// 取消收藏
export function setCancelCollect (params) {
  return new Promise((resolve, reject) => {
    const url = '/CancelCollect'
    Utils.post(params, url).then((res) => {
      resolve(res.data)
    }).catch((res) => {
      reject(res)
    })
  })
}