const webpack = require('webpack');
const path = require('path'); // export библиотеки path
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'), // папка по дефолту с использованием path и системной переменной __dirname
    mode: 'development', // мод разработки по дефолту
    entry: ['@babel/polyfill', './index.js'], // точка входа и полифилл для работы на devServere(на Node работало без него)
    output: {          // выходные данные, складываются в папку dist
        filename: filename('js'), // для того,чтобы сохраненный в браузере hash не подменялся, файл всегда разный.(смотреть переменную filename)
        path: path.resolve(__dirname, 'dist') 
    },
    devtool: isDev ? 'source-map' : false, //расширенные карты в инструментах разработчика в браузере
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3000
    },
    resolve: {
        extensions: ['.js'], //расширения
        alias: { // чтобы не прописывать пути
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin({ // работает с --hot в строке запуска
        //   // Options...
        // }),
        new CleanWebpackPlugin(), // плагин чистит лишние bundlы
        new HtmlWebpackPlugin({ // плагин для подключения HTML в сборку
            template: 'index.html', // путь по дефолту scr(можно не указывать), есть еще свойства, это минимальный набор
            minify: {
              removeComments: isProd, //удаляет комментарии
              collapseWhitespace: isProd // удаляет пробелы (все в prode)
            }
        }),
        new CopyPlugin({ //копирует faviconки и т.д.
            patterns: [{ 
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'), 
            }],
          }),
          new MiniCssExtractPlugin({ //плагин подключает сss в сборку
              filename: filename('css')
          })

    ],
    module: {
        rules: [ //различные загрузчики
          { //css
            test: /\.s[ac]ss$/i,  //scss и sass
            use: [{
              loader: MiniCssExtractPlugin.loader //важен порядок, подгружает снизу вверх //hot reload возможно не работает с этим лоадером // нет, не работает с browserlist
            },{
              loader: "css-loader"
            },{
              loader: "sass-loader"
            }]
          },
          { //babel, для реализации совместимости на старых версиях браузера
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}