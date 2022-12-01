const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  lintOnSave: undefined,
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
  chainWebpack: config => {
  },
  configureWebpack: config => {

    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
        ]
      }
    } else {
      return {
        plugins: [
        ]
      }
    }
  }
}
