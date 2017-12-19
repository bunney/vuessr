/**
 *@Description 开发环境Webpack配置项
 */
console.log('webpack进程项',process.env.NODE_ENV );
const Visualizer = require('webpack-visualizer-plugin');

const conf = require('./webpack.conf')
const path = require('path')
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 主角 作者自己写的 Loader
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const vueConfig = require('./vue-loader.config')
// 摘取vue 模板里的 style
vueConfig.loaders = {
  // enable CSS extraction
  extractCSS: true
}
const options = {
  output: {
    // path: conf.rootPath + '/build/assets/',
    path: path.resolve(__dirname, '../build/assets/'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  // externals: {
  //     jquery: 'vue'
  // },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles/[name].css'),
    // Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      // name: "vendor",
      // filename: 'scripts/[name].js',
      // minChunks: 2
      name: 'manifest',
      filename: 'scripts/[name].js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // 生成 `vue-ssr-client-manifest.json`;
    // 把对应的前端的资源 对应生成的 chunks 的匹配项  打到json 文件里 
    // 知道下一页要去哪  在首页 预加载 preload  preset  都是为了保证chuncks的执行顺利
    // 1.在生成的文件名中有哈希时，可以取代 html-webpack-plugin 来注入正确的资源 URL。
    // 2.保证chunck的提前预加载
    new VueSSRClientPlugin(),
    // html文件 要送过去 实际上服务端渲染跟这个东西没有关系
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/webapp/indexdev.html',
        inject: false
    }),
    new Visualizer({
      filename: '../statistics.html'
    })
  ]
}

const _options = Object.assign(options, conf.dev)
module.exports = _options
