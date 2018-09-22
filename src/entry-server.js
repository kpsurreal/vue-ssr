/*
* @Author: jiangjian
* @Date:   2018-05-04 16:21:13
* @Last Modified by:   jiangjian
* @Last Modified time: 2018-05-23 21:04:00
*/

import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents || !matchedComponents.length) {
        return reject(new Error({code: 400}))
      }
      Promise.all(matchedComponents.map(Components => {
        if (Components.asyncData) {
          return Components.asyncData({
            store,
            router: router.currentRouter
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
