import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createStore } from './vuex/store'
import { createRouter  } from './router'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
    // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
    // 同步路由状态(route state)到 store
    sync(store, router)
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    // 后来新更新的方法
    router,
    store,
    render: h => h(App)
  })
  // 当执行每一次创建实例的时候 都把这个执行了一遍 客户端创建一次  
  // 服务端 要创建很多次
  return { router,app,store }
}