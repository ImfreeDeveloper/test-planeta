const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge') // Для грамотного обьединения обектов
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // Красивый вывод в консоли
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('cleanup-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let isDev = false

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  url: '/'
}

const base = () => {
  const config = {
    context: PATHS.source,
    entry: {
      main: ['@babel/polyfill', PATHS.source + '/js/main.js']
    },
    output: {
      path: PATHS.build,
      publicPath: PATHS.url,
      filename: 'js/[name].bundle.js'
    },
    optimization: {
      runtimeChunk: { name: 'main' },
      splitChunks: {
        cacheGroups: {
          default: false,
          main: {
            test: /\.js$/,
            chunks: 'async',
            minChunks: 2,
            name: 'main',
            enforce: true
          }
        }
      },
      minimizer: [
        new OptimizeCssAssetsPlugin({}), // css mini
        new TerserPlugin({ // js mini
          sourceMap: isDev,
          extractComments: true
        })
      ]
    },
    performance: { hints: false },
    stats: { // Вывод в консоль
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/templates'),
          use: ['raw-loader']
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: isDev, url: false }
            },
            {
              loader: 'group-css-media-queries-loader',
              options: { sourceMap: isDev }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
                plugins: [
                  autoprefixer({
                    browsers: [
                      'ie >= 8',
                      'last 2 versions',
                      'Android >= 4',
                      'Safari >= 6'
                    ]
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }]
        },
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin({ // Работа с ошибками, с событием об успехе сборки
        clearConsole: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['main'],
        template: PATHS.source + '/templates/index.html'
      }),
      new CleanWebpackPlugin({
        include: ['dist']
      }),

      new CopyWebpackPlugin([
        {
          from: './images',
          to: 'images'
        },
        {
          from: './fonts',
          to: 'fonts'
        }
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  }
  return config
}

const productionConfig = () => {
  const config = {
    plugins: [
      new ProgressBarPlugin()
    ]
  }
  return merge(base(), config)
}

const devServerConfig = () => {
  const config = {
    devtool: 'source-map',
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      contentBase: PATHS.build,
      stats: 'errors-only',
      port: 8081,
      overlay: true,
      quiet: true,
      historyApiFallback: true
    },
    plugins: [
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['app is running http://localhost:8081']
        },
        onErrors: (() => {
          const notifier = require('node-notifier')

          return (severity, errors) => {
            if (severity !== 'error') return

            const error = errors[0]
            const filename = error.file && error.file.split('!').pop()

            notifier.notify({
              title: 'auto',
              message: severity + ': ' + error.name,
              subtitle: filename || '',
              icon: PATHS.build + '/images/error.png'
            })
          }
        })()
      })
    ]
  }
  return merge(base(), config)
}

module.exports = (env, argv) => {
  isDev = argv.mode === 'development'
  if (argv.mode === 'production') {
    // config.plugins.push(new CleanWebpackPlugin("dist"));
    return productionConfig()
  }
  if (argv.mode === 'development') {
    return devServerConfig()
  }
}
