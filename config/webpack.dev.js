const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const authorPlugin = require("../src/plugins/authorPlugin");
const fs = require("fs");
const pages = fs.readdirSync(path.resolve(__dirname, "../src/pages"));
var px2rem = require('postcss-px2rem');
const entrys = {
    main: "./src/main.ts"
};
pages.map((item) => {
    entrys[item] = `./src/pages/${item}/index.js`
})
debugger
module.exports = {
    mode: "development",
    entry: entrys,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "./js/[name]-[hash].js",
        // publicPath:"/assets/"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options:{
                        name:"[name].[ext]",
                        outputPath: './images',
                        publicPath: '/images/',
                    } 
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    px2rem({remUnit: 100})
                                ]  
                            }
                        }
                    },
                    "less-loader",
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: '/node_modules/'
            }
        ]
    },
    resolve:{
        alias:{
            "@assets":path.resolve(__dirname,'../src/assets')
        }
    },
    resolveLoader: {
        modules: ['node_modules', './src/loaders'] // 先从node_modules中查找，没有从loaders文件夹中查找loader1.js
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "192.168.0.107",
        compress: true,
        port: 8080
    },
    devtool: 'source-map',
    stats:{
        // all:true,
        timings:false
    },
    plugins: [
        new authorPlugin({
            author:"liuxiaojie",
            email:"1245145809@qq.com"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/[name].css`
        }),
        ...pages.map(page => {
            return new HtmlWebpackPlugin({
                title: "template",
                filename: `${page}.html`,
                template: `./src/pages/${page}/index.html`,
                chunks: [`${page}`, 'main'],
                inject: 'head'
            })
        })

    ]


}