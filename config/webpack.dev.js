const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");
const pages = fs.readdirSync(path.resolve(__dirname, "../src/pages"));
const entrys = {
    main: "./src/main.ts"
};
pages.map((item) => {
    entrys[item] = `./src/pages/${item}/index.ts`
})
module.exports = {
    mode: "development",
    entry: entrys,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "./js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    path.resolve(__dirname, "../src/loaders/st-loader.js"),
                    path.resolve(__dirname, "../src/loaders/cs-loader.js")
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
        port: 8080
    },
    plugins: [
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