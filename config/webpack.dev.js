const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin}= require("clean-webpack-plugin");
const fs = require("fs");
const pages = fs.readdirSync(path.resolve(__dirname,"../src/pages"));
const entrys = {
    main:"./src/main.js"
};
pages.map((item)=>{
    entrys[item] = `./src/pages/${item}/index.js`
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