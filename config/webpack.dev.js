const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {CleanWebpackPlugin}= require("clean-webpack-plugin");
module.exports = {
    mode:"development",
    entry:{
        main:"./src/pages/index/index.js"
    },
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:"[name]-bundle-[hash].js"
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg)$/,
                use:{
                    loader:'file-loader',
                    options:"[name].[ext]"
                }                
            },
            // {
            //     test:/\.js$/,
            //     use:"babel-loader"      
            // },
            // {
            //     test:/\.(tpl|ejs)$/,
            //     use:[
            //         "html-withimg-plugin",
            //         "ejs-loader"
            //     ]  
            // },
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    // "sass-loader"
                ]  
            }
        ]
    },
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        host:"127.0.0.1",
        compress:true,
        port:8090
    },
    plugins:[
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].css`
            // filename: `${REGION}/css/[name]-[contenthash:8].css`
        }),
        new HtmlWebpackPlugin({
            title:"template",
            chunks:["main","vendor"],
            filename:"index.html",
            template:"./src/pages/index/index.html"
        })
    ]


}