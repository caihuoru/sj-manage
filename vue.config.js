const CompressionWebpackPlugin = require('compression-webpack-plugin')
const {resolve} = require('path')
module.exports = {
  publicPath: '',
  lintOnSave: undefined,
  productionSourceMap: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [
    // other js file
  ],
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    proxy: {
      "/local/apis": {
        target: "http://192.168.1.135:9990/services/ag/services/Amfphp/gateway.php", // 本地接口
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/local/apis": "", //需要rewrite重写的,
        },
      }, 
      "/api" : {
        "target" : "http://192.168.1.121:8988/api",
        "changeOrigin" : true,
        "secure" : false,
        "pathRewrite" : {
            "^/api" : "/"
        }
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' + ['html', 'js', 'css'].join('|') + ')$'
                ),
                threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                deleteOriginalAssets: false // 删除原文件
            })
        )
    }
    config.resolve.alias["d3-regression"] = "d3-regression/dist/d3-regression.js"
    // console.log(config.module.rules)
    const obj = {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
            resolve('node_modules/d3-regression/dist/d3-regression.js'),
            resolve('node_modules/d3-regression/dist/d3-regression.min.js'),
            resolve('node_modules/@antv/g2plot'),
            resolve('node_modules/@antv/g2'),
            resolve('d3-regression'),
            resolve('@antv/g2plot')
        ]
    }
    config.module.rules.push(obj)
},
}
