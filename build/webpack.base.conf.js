'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 配置Vux
const vuxLoader = require('vux-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
let webpackCofig = {
  context: path.resolve(__dirname, '../'),
  entry() {
    // 初始化入口配置
    const entry = {}
    // 所有模块的列表
    const moduleToBuild = require('./module-conf').getModuleToBuild() || []
    // 根据传入的待打包目录名称，构建多入口配置
    for (let module of moduleToBuild) {
      entry[module] = `./src/modules/${module}/main.js`
    }
    return entry
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [ /*createLintingRule()*/ ] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}


module.exports = vuxLoader.merge(webpackCofig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style', {
    name: 'after-less-parser',
    fn: function (source) {
      const sourcePath = this.resourcePath.replace(/\\/g, '/')
      if (sourcePath.indexOf('vux/src/components') > -1) {
        source = source.replace(/px/g, 'PX')
      }
      // // 自定义的全局样式大部分不需要转换
      // if (sourcePath.indexOf('App.vue') > -1) {
      //   source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px')
      // }
      return source
    }
  }, {
    name: 'style-parser',
    // <style></style> 代码处理
    fn: function (source) {
      const sourcePath = this.resourcePath.replace(/\\/g, '/')
      if (sourcePath.indexOf('vux/src/components') > -1) {
        source = source.replace(/px/g, 'PX')
      }
      // 避免转换1PX.less文件路径
      if (source.indexOf('1PX.less') > -1) {
        source = source.replace(/1PX.less/g, '1px.less')
      }
      return source
    }
  }, {
    name: 'less-theme',
    path: 'src/assets/sass/theme.less' // 相对项目根目录路径
  }]
})
