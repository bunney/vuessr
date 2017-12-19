'use strict';
import indexController from './indexController';

// 所有人的路由 都要指定到 indexController 里  所以 404的错误还是用node 处理
const controllerInit = {
    getAllrouters(app, router) {
        app.use(router(_ => {
            _.get('/', indexController.index());
            _.get('/about', indexController.index());
            _.get('/counter', indexController.index());
            _.get('/topics/:id', indexController.index());
            _.get('/test', indexController.index());
            _.get('/index/getdata', indexController.getData());
        }));
    }
};
export default controllerInit;