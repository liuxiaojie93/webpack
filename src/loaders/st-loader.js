
let loaderUtils = require("loader-utils");
//style-loader是接收less-loader过来的内容进行解析
function loader(source,callback) {
    console.log("st-loader",source);
    //组装成style格式的css
    let style = (`
        $(()=>{
            let style = document.createElement("style");
            style.innerHTML = ${JSON.stringify(source)};
            document.head.appendChild(style);
            document.body.innerHTML = ${JSON.stringify(source,null,3)}})
        `);
        return style
}
module.exports = loader;