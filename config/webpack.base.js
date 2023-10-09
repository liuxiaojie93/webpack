const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const fs = require("fs");
const { log } = require("console");
const pages = fs.readdirSync(path.resolve(__dirname, "../src/pages"));
console.log("__dirname",__dirname);
const webpack  = require("webpack")
const entrys = {
  // main:"./src/main.js"
};
pages.map((item) => {

  entrys[item] = [`./src/libs/helper.js`,`./src/pages/${item}/main.js`];
});
module.exports = {
  entry: entrys,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "./js/[name].js",
  },
  resolve: {
    extensions:[".js",".vue",".json"],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',//内部为正则表达式  vue结尾的
        "@":path.resolve(__dirname,"../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:{
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href']
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader", 
        options: {
          name: "assets/[name]-[contentHash:8].[ext]",
        },
      },
      {
        test: /\.js$/,
        include:[path.resolve(__dirname,"../src")],
        // exclude:{
        //   // and: [/node_modules/], // Exclude libraries in node_modules ...
        //   // not: [
        //   //   // Except for a few of them that needs to be transpiled because they use modern syntax
        //   //   /unfetch/,
        //   //   /d3-array|d3-scale/,
        //   //   /@hapi[\\/]joi-date/,
        //   // ]
        // },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                  },
                },
              ],
            ],
            // cacheDirectory:true
            // plugins: ['@babel/plugin-proposal-class-properties']
          },
        },
      },
      // {
      //     test:/\.(tpl|ejs)$/,
      //     use:[
      //         "html-withimg-plugin",
      //         "ejs-loader"
      //     ]
      // },
      {
        test: /\.(sc|c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "vue-style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      'process.env.FOA':JSON.stringify("asdfaf"),
      "FOO":JSON.stringify("bar")
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/[name].css`,
    }),
    ...pages.map((page) => {
      return new HtmlWebpackPlugin({
        title: "template",
        filename: `${page}.html`,
        template: `./src/pages/${page}/index.html`,
        // chunks: ["vendors",`${page}`],
        chunks: ['vendors',`${page}`],
        inject: "body",
      });
    }),
    
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // minSize: 30000,
      maxSize: 5000000,
      // minChunks: 3,
      maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: 'a',
      name: false,
      hidePathInfo:true,
      cacheGroups: {
        vendors: {
          test:/[\\/]node_modules[\\/]/,
          name:"vendors",
          chunks: 'all',
          priority: -1
        },
        // default: {
        //   minChunks: 2,
        //   priority: 10,
        //   reuseExistingChunk: true
        // }
      }
    }
  }
};
