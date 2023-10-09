console.log("helper");
const list = require.context("../libs",true,/\/*?.js/)
console.log("list",list);
