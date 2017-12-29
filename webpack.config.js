var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //context: path.resolve('js'),
    entry: [
        './js/app.js',
        './css/app.less',
        './css/bootstrap.css'
    ],
    output : {
        path: path.resolve('build/'),
        publicPath: '/public/assets/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'public',
        host: 'localhost',
        port: 3000
    },
    watch : true,
    module : {

        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader","less-loader"]
                })
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin(
            {
                filename: "styles.css",
                disable: false,
                allChunks: true
            }),
    ],
    resolve:{
        extensions:['.js','.es6','css','less']
    }
};