// 入口不能再用 APP.js 的入口文件了 我们转到这里
import { createApp } from './app.js';
// 接下来一个 导  一个 渲染
// 客户端特定引导逻辑……
const { app,router } = createApp()
// 这里假定 App.vue 模板中根元素具有 `id="app"`
// 把对应实例挂到 对应组件里
router.onReady(() => {
    app.$mount('#app')
})
  