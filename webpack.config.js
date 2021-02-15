const path = require('path'); // export библиотеки path
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
    context: path.resolve(__dirname, 'src'), // папка по дефолту с использованием path и системной переменной __dirname
    mode: 'development', // мод разработки по дефолту
    entry: './index.js', // точка входа
    output: {          // выходные данные, складываются в папку dist
        filename: 'bundle.[hash].js', // для того,чтобы сохраненный в браузере hash не подменялся, файл всегда разный.
        path: path.resolve(__dirname, 'dist') 
    },
    resolve: {
        extensions: ['.js'], //расширения
        alias: { // чтобы не прописывать пути
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    plugins: [
        new CleanWebpackPlugin(), // плагин чистит лишние bundlы
        new HtmlWebpackPlugin({ // плагин для подключения HTML в сборку
            template: 'index.html' // путь по дефолту scr(можно не указывать), есть еще свойства, это минимальный набор
        }),
        new CopyPlugin({ //копирует faviconки и т.д.
            patterns: [{ 
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'), 
            }],
          }),
          new MiniCssExtractPlugin({ //плагин подключает сss в сборку
              filename: 'bundle.[hash].css'
          })

    ],
    module: {
        rules: [ //различные загрузчики
          { //css
            test: /\.s[ac]ss$/i,  //scss и sass
            use: [
              MiniCssExtractPlugin.loader, //важен порядок, подгружает снизу вверх
              "css-loader",
              "sass-loader",
            ],
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