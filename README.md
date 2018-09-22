# vue-ssr

### 构建 vue + vuex + vue-router + vue-ssr + webpack

### 特点
使用服务端渲染 ，更合理的seo优化，服务端数据缓存，更快的内容到达时间，页面初始化加载
可使用服务端代理

### 弊端
* 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数(lifecycle hook)中使用；一些外部扩展库(external library)可能需要特殊处理，才能在服务器渲染应用程序中运行。

* 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序(SPA)不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

* 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源(CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic)下使用，请准备相应的服务器负载，并明智地采用缓存策略

### 使用
1. 安装

```
	npm install
```
2. dev

```
	npm run dev
```
3. build

```
	npm run build
```

4. pro
```
	npm start
```

### 项目结构 （文件夹说明）
* build 
	* setup-dev-server ``` 调试时的webpack配置``` 
	* utils ``` 辅助方法 ```
	* vue-loader.conf ``` vue-loader 解析配置 ```
	* webpack.base.conf ```webpack基本配置```
	* webpack.client.conf ```webpack客户端配置```
	* webpack.server.conf ```webpack服务端配置```
* config ```配置参数```
	* dev
	* index
	* pro
* dist ``` 生产目录```
* node_modules ```不解释```
* puclic ```服务端公用文件```
* src ```不解释```
* .* ```eslint 配置和 babel 配置```
* package.json ```不解释```
* server.js ```服务端启动文件```

### 文件详解
server.js

* 功能

	完成服务器的启动，路由配置，模块加载 
	
	判断是环境，加载不同配置项 dev or pro
	
* createRenderer 服务端渲染核心方法

	核心模块为vue-server-renderer
	
	[aip文档](https://ssr.vuejs.org/en/api.html#createrendereroptions)

* 判断环境 启动dev 或者pro

	如果是pro直接加载build后的文件
	否则 启动webpack的调试模式
	加载webpakc 调试配置setup-dev-server 
	
* 启动server 

	核心模块 express
	
	[aip文档](http://www.expressjs.com.cn/4x/api.html)
	
  服务端代理（非必须）
  核心模块 http-proxy-middleware
  
  [aip文档](https://www.npmjs.com/package/http-proxy-middleware)
  
  解决跨域问题 抓起数据等等 模块虽小 但是功能强大

setup-dev-server 

* 开发模式下的webpack 配置
* 调用webpack.client 和 webpack.server 分别打包客户端文件和服务端文件 
* 启动热更新

webpack.base.conf

* webpack的基本配置文件


### 流程详解
* server渲染逻辑

	* createRenderer方法
	
	  通过dev-bundle 或pro-bundle 调用 vue-server-renderer模块的createBundleRenderer方法生成模版 renderer
	  vue-server-renderer
	  [aip文档](https://ssr.vuejs.org/en/api.html)
* app.js 入口文件修改
	 * 避免状态单例
	
	 * 当编写纯客户端(client-only)代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。
	 
	 * 如果我们在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染(cross-request state pollution)。

	 * 因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例：
	 
		```
		// app.js
		const Vue = require('vue')
		
		module.exports = function createApp (context) {
		  return new Vue({
		    data: {
		      url: context.url
		    },
		    template: `<div>访问的 URL 是： {{ url }}</div>`
		  })
		}
		```
* 入口文件修改
	* entry-client.js:
	
		客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：
		
		```
		import { createApp } from './app'

		// 客户端特定引导逻辑……
		
		const { app } = createApp()
		
		// 这里假定 App.vue 模板中根元素具有 `id="app"`
		app.$mount('#app')
		```
	* entry-server.js:
	
		服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配(server-side route matching)和数据预取逻辑(data pre-fetching logic)。
		
		```
		import { createApp } from './app'
		
		export default context => {
		  const { app } = createApp()
		  return app
		}
		```
* 路由分离
	* 使用vue-router 
	在路由入口处使用工厂方法返回实例
	
	```
	// router.js
	import Vue from 'vue'
	import Router from 'vue-router'
	
	Vue.use(Router)
	
	export function createRouter () {
	  return new Router({
	    mode: 'history',
	    routes: [
	      // ...
	    ]
	  })
	}
	```
	* server.js 对应修改
	
	
	```
	
		// entry-server.js
		import { createApp } from './app'
		
		export default context => {
		  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
	    // 以便服务器能够等待所有的内容在渲染前，
	    // 就已经准备就绪。
	  	return new Promise((resolve, reject) => {
	    const { app, router } = createApp()
	
	    // 设置服务器端 router 的位置
	    router.push(context.url)
	
	    // 等到 router 将可能的异步组件和钩子函数解析完
	    router.onReady(() => {
	      const matchedComponents = router.getMatchedComponents()
	      // 匹配不到的路由，执行 reject 函数，并返回 404
	      if (!matchedComponents.length) {
	        return reject({ code: 404 })
	      }
	
	      // Promise 应该 resolve 应用程序实例，以便它可以渲染
	      resolve(app)
	    }, reject)
	  })
	}
	```
	
* 状态管理
	* 使用vuex
	在vuex入口处使用工厂方法返回实例
	
	```
	// store.js
	import Vue from 'vue'
	import Vuex from 'vuex'
	
	Vue.use(Vuex)
	
	// 假定我们有一个可以返回 Promise 的
	// 通用 API（请忽略此 API 具体实现细节）
	import { fetchItem } from './api'
	
	export function createStore () {
	  return new Vuex.Store({
	    state: {
	      items: {}
	    },
	    actions: {
	      fetchItem ({ commit }, id) {
	        // `store.dispatch()` 会返回 Promise，
	        // 以便我们能够知道数据在何时更新
	        return fetchItem(id).then(item => {
	          commit('setItem', { id, item })
	        })
	      }
	    },
	    mutations: {
	      setItem (state, { id, item }) {
	        Vue.set(state.items, id, item)
	      }
	    }
	  })
	}
	```
	
	修改server.js
	
	```
	// app.js
	import Vue from 'vue'
	import App from './App.vue'
	import { createRouter } from './router'
	import { createStore } from './store'
	import { sync } from 'vuex-router-sync'
	
	export function createApp () {
	  // 创建 router 和 store 实例
	  const router = createRouter()
	  const store = createStore()
	
	  // 同步路由状态(route state)到 store
	  sync(store, router)
	
	  // 创建应用程序实例，将 router 和 store 注入
	  const app = new Vue({
	    router,
	    store,
	    render: h => h(App)
	  })
	
	  // 暴露 app, router 和 store。
	  return { app, router, store }
	}
	```
	  
	  
	


