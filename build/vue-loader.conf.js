'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    require('postcss-plugin-px2rem')({
      rootValue: 34, // 这里对应的是750的设计图尺寸 为什么是34？
      selectorBlackList: ['fs'], //这里的类名不被转化 fs-xxx的样式不被转化
      minPixelValue: 2, //小于2px的样式不被转化 ---针对border
      mediaQuery: true,
      propBlackList: [] // 如果要保持font-size不转换，替换为 ['font-size']
    })
  ]
}
