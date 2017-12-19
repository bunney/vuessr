import { createApp } from './app.js'
export default context => {
  // 后端传过来 context node 的ctx 上下文  返回一个 Promise 对象  
  // 从前后端拿到真正的路由  后端路由加入前端之后 前端路由拿后端路由做匹配
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // ------------------------------------
      // 后端处理404 官网这个可以去掉
      // if (!matchedComponents.length) {
      //   return reject({ code: 404 })
      // }
      // ------------------------------------
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
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