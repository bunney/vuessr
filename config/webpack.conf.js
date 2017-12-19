/*
 *@Description webpack module、plugins等核心配置文件
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rootPath = path.join(__dirname, '..');
// const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const vueConfig = require('./vue-loader.config');
const _module = {
    rules: [{
        test: /\.js$/,
        use: [{
            loader: "babel-loader"
        }]
    }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
    }]
};
const _resolve = {
    extensions: [".vue", ".js", ".es", ".css"],
    alias: {
        vue: 'vue/dist/vue.js'
    }
};
// 前端开发环境Loader
let _devLoaders = _.clone(_module.rules);
// 前端上线环境Loader
let _prodLoaders = _.clone(_module.rules);
// 生产服务器 Loader
let _serverLoaders = _.clone(_module.rules);
const cssLoaders = {
    //设置对应的资源后缀.
    test: /\.(css)$/,
    //设置后缀对应的加载器.
    // css 只是在客户端的时候编译 给 dev && prod 环境用  server 环境是用不到的
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader'
    })
};
const fileloader = {
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=images/[name].[ext]'
};
_devLoaders.push(cssLoaders);
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=images/[name].[hash:5].[ext]'
});
_prodLoaders.push(cssLoaders);
_serverLoaders.push(fileloader)
const webpackConfig = {
    dev: {
        // entry:{
        //     main: [ 'webpack/hot/dev-server',"webpack-hot-middleware/client?http://localhost:8081/", rootPath + '/src/webapp/entry-client.js']
        // },
        entry: [rootPath + '/src/webapp/entry-client.js'],
        module: {
            rules: _devLoaders
        },
        resolve: _resolve,
    },
    prod: {
        entry: rootPath + '/src/webapp/entry-client.js',
        module: {
            rules: _prodLoaders
        },
        resolve: _resolve
    },
    server: {
        entry: rootPath + '/src/webapp/entry-server.js',
        //entry: [ 'webpack/hot/dev-server',"webpack-hot-middleware/client?http://localhost:8081/", rootPath + '/src/webapp/entry-server.js'],
        module: {
            rules: _serverLoaders
        },
        resolve: _resolve
    }
};
module.exports = webpackConfig;
module.exports.rootPath = rootPath;