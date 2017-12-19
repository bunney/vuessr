import Vue from 'vue';
import Home from '../components/home.vue';
import About from '../components/about';
import Counter from '../components/counter';
import Topics from '../components/topics';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
export function createRouter() {
    let router = new VueRouter({
        //  一定要用 history 格式 -> /a/b   
        // hash 的话  后端不认
        mode: 'history',
        // 这个会用 webpack 编译 认识后端的 __dirname
        base: __dirname,
        routes: [
            { path: '/', component: Home },
            { path: '/topics/:id', component: Topics },
            { path: '/counter', component: Counter },
            { path: '/about', component: () => import('../components/about.vue')}
        ]
    });
    return router;
}
