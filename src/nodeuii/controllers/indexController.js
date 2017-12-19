'use strict';
import indexModel from '../models/indexModel';
import cheerio from 'cheerio';
// import config from '../config/config';
/*vue ssr start*/
// *负责把 server 生成的 bundle json  帮助去 render*
import { createBundleRenderer } from 'vue-server-renderer';
import fs from 'fs';
import path from 'path';
//创建数据流
// 创建一个向前端render 的方法 这里需要用 vue 的 server-render 出去
function createRenderer(bundle, template, clientManifest) {
    // 首先接收一个后台的 bundle
    return createBundleRenderer(bundle, {
        // 缓存特质 设置缓存时间
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        runInNewContext: false, // 推荐
        template,
        clientManifest
    })
}
const rootPath = path.join(__dirname, '..');
//  现在已经没有 views了   都是通过流式渲染
// 把html 文件读出来 然后通过cheerio 把 meta title 标签填进去
const template = fs.readFileSync(rootPath + '/assets/index.html', 'utf-8');
const $ = cheerio.load(template);
$('title').html('dududu');
$("head").append(' <meta name="keywords" content=dudu>');
console.log('模板数据',$.html());
const serverBundle = require('../assets/vue-ssr-server-bundle.json');
const clientManifest = require('../assets/vue-ssr-client-manifest.json');
/*vue ssr end*/
const indexController = {
    getData() {
        return async(ctx, next) => {
            const indexModelIns = new indexModel();
            const _data = await indexModelIns.getData();
            // logger.info('哈哈哈哈');
            ctx.body = _data;
            console.log(1)
        }
    },
    index() {
        return async(ctx, next) => {
            const s = Date.now();
            const ssrrender = createRenderer(serverBundle, $.html(), clientManifest);
            const context = { url: ctx.url };
            function createSsrStreamPromise() {
                return new Promise((resolve, reject) => {
                    if (!ssrrender) {
                        return ctx.body = 'waiting for compilation.. refresh in a moment.'
                    }
                    const ssrStream = ssrrender.renderToStream(context);
                    ctx.status = 200;
                    ctx.type = 'html';
                    ssrStream.on('error', err =>{reject(err)}).pipe(ctx.res);
                });
            }
            await createSsrStreamPromise(context);
        };
    }
};
export default indexController;
