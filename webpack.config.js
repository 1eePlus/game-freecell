let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: "app.js",
        // chunkFilename: '[id].css'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            // chunkFileName: "indexss.css"
        })
    ],
    module: {
        rules: [
            //css-loader 处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            },
            //url-loader 处理图片
            {
                test: /\.(png|jpg)$/,
                // loader: "url-loader?limit=8&name=images/[hash:8].[name].[ext]",
                loader: 'url-loader?limit=8&name=[name].[ext]&outputPath=assets/img/'
                // options:{
                //     publicPath:'./img'
                // }
                //limit参数，代表如果小于大约4k则会自动帮你压缩成base64编码的图片,否则拷贝文件到生产目录
                //name后面是打包后的路径；
                //loader 后面 limit 字段代表图片打包限制，这个限制并不是说超过了就不能打包，而是指当图片大小小于限制时会自动转成 base64 码引用
                //上例中大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
            },
            //babel-loader 编译es6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    mode: 'development' ,
    //打包压缩
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'index',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};

// "babel-core": "^6.22.1",
// "babel-loader": "^7.1.1",
// "babel-preset-es2015": "^6.24.1",
// "babel-preset-latest": "^6.24.1",
// "html-webpack-plugin": "^3.2.0",
// "jquery": "^3.3.1",
// "webpack": "^3.6.0",
// "webpack-cli": "^3.1.2",
// "webpack-dev-server": "^3.1.10"

//"server": "webpack-dev-server"