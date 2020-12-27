const path = require('path') // export библиотеки path

module.exports = {
    context: path.resolve(__dirname, 'src'), // папка по дефолту с использованием path и системной переменной __dirname
    mode: 'development', // мод разработки
    entry: './index.js', // точка входа
    output: {          // выходные данные, складываются в папку dist
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}