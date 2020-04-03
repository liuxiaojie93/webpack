const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const authorPlugin = require("../src/plugins/authorPlugin");
const cleanConsolePlugin = require("../src/plugins/CleanConsolePlugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require("fs");
const pages = fs.readdirSync(path.resolve(__dirname, "../src/pages"));
const entrys = {
    main: "./src/main.ts"
};
pages.map((item) => {
    entrys[item] = `./src/pages/${item}/index.ts`
})
debugger
module.exports = {
    mode: "development",
    entry: entrys,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "./js/[name]-[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.cs$/,
                use: [
                    path.resolve(__dirname, "../src/loaders/st-loader.js"),
                ]
            },
            {
                test: /\.es$/,
                use: [
                    path.resolve(__dirname, "../src/loaders/es-babel.js"),
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: "[name].[ext]"
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
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
    resolveLoader: {
        modules: ['node_modules', './src/loaders'] // 先从node_modules中查找，没有从loaders文件夹中查找loader1.js
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "localhost",
        compress: true,
        port: 8090
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
        new cleanConsolePlugin(),
        new BundleAnalyzerPlugin(),
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