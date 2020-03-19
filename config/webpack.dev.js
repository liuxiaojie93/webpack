const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin}= require("clean-webpack-plugin");
const fs = require("fs");
const pages = fs.readdirSync(path.resolve(__dirname,"../src/pages"));
const entrys = {
    main:"./src/main.ts"
};
pages.map((item)=>{
    entrys[item] = `./src/pages/${item}/index.ts`
})
module.exports = {
    mode:"development",
    entry:entrys,
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:"./js/[name].js"
    },
    module:{
        rules:[
            {
                test:/\.txt$/,
                loader:path.resolve(__dirname,"../src/loaders/cs-loader.js")
            },
            {
                test:/\.(png|jpg)$/,
                use:{
                    loader:'file-loader',
                    options:"[name].[ext]"
                }                
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              },
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // "sass-loader"
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
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        host:"localhost",
        compress:true,
        port:8080
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/[name].css`
        }),
        ...pages.map(page=>{
            return new HtmlWebpackPlugin({
                title:"template",
                filename:`${page}.html`,
                template:`./src/pages/${page}/index.html`,
                chunks:[`${page}`,'main'],
                inject: 'head'
            })
        })
        
    ]


}