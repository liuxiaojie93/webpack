const path = require("path");
const {merge} = require("webpack-merge");
const baseEnv = require("./webpack.base");

module.exports = merge(baseEnv, {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: "127.0.0.1",
    compress: true,
    port: 8090,
  },
});
