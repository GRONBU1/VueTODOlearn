const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
// webpack-dev-server 配置
if (isDev) {
  // 帮助我们在浏览器调试代码,因为我们写的是vue,es6 代码,实际上浏览器是看不懂这些我们写的代码的,
  // 浏览器看的是处理后的代码,但是我们浏览器调试的时候肯定希望看到的是自己写的代码,所以需要这个工具映射
  // 开发坏境的配置
  config.module.rules.push({
    test: /\.styl(us)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-modeul-eval-source-map'
  config.devServer = {
    port: 8888,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // 页面不刷新即可重写页面数据
    hot: true
  }
  // 开hot 还需要添加两个插件
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 生成坏境的配置
  config.entry = {
    // 将所用到的类库单独打包
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl(us)$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[md5:contentHash:hex:8].css')

    // // 将类库文件单独打包出来
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),

    // // webpack相关的代码单独打包
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // })
  )

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5 // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config
