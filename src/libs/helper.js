console.log("helper");
const list = require.context("../libs", true, /\/*?.js/);
console.log("list", list);

export const formatJSON = (json, indent = 2, leftBracesInSameLine = 2) => {
  function getIndentStr(level) {
    var str = "";
    for (var i = 0; i < level; i++) str += indent || "	";
    return str;
  }
  function format(obj, level) {
    level = level == undefined ? 0 : level;
    var result = "";
    if (typeof obj == "object" && obj != null) {
      // 如果是object或者array
      var isArray = obj instanceof Array,
        idx = 0;
      result += (isArray ? "[" : "{") + "\n";
      for (var i in obj) {
        result += idx++ > 0 ? ",\n" : ""; // 如果不是数组或对象的第一个内容，追加逗号
        var nextIsObj = typeof obj[i] == "object" && obj[i] != null,
          indentStr = getIndentStr(level + 1);
        result += isArray && nextIsObj ? "" : indentStr; // 如果当前是数组并且子项是对象，无需缩进
        result += isArray
          ? ""
          : '"' + i + '": ' + (nextIsObj && !leftBracesInSameLine ? "\n" : "");
        result +=
          !nextIsObj || (nextIsObj && leftBracesInSameLine && !isArray)
            ? ""
            : indentStr;
        result += format(obj[i], level + 1); // 递归调用
      }
      result += "\n" + getIndentStr(level) + (isArray ? "]" : "}") + "";
    } // 如果是 null、number、boolean、string
    else {
      var quot = typeof obj == "string" ? '"' : ""; //是否是字符串
      result += quot + obj + quot + "";
    }
    return result;
  }
  return format(eval("(" + json + ")")); // 使用eval的好处是可以解析非标准JSON
};

export const parseJSON = (originStr) => {
  try {
    eval(`window._originStr = ${originStr}`);
    console.log("window._originStr", window._originStr);
    let jsonStr = JSON.stringify(window._originStr, null, 2);
    let remarkObj = []; // 备注信息
    let originStrLine = originStr.split("\n"); // 初始数据的每一行
    let jsonStrLine = jsonStr.split("\n"); // 解析后的数据

    // 获取备注信息
    originStrLine.forEach((line) => {
      if (/[^:]\/\//.test(line)) {
        let linePart = line.split("//");
        remarkObj[line.split(":")[0].trim()] = ` // ${linePart.pop().trim()}`;
      }
    });

    // 给格式化后的数据添加备注
    jsonStrLine = jsonStrLine.map((line) => {
      // if (this.withoutValue) { // 是否去值
      //   line = line.replace(/: "[^"]+"/, ': ""')
      // }
    //   line = line.replace(/: "[^"]+"/, ': ""');
      Object.keys(remarkObj).some((remarkItem) => {
        if (line.indexOf(remarkItem) > -1) {
          let value = remarkObj[remarkItem];
          delete remarkObj[remarkItem];
          line += value;
          return true;
        }
        return false;
      });
      return line;
    });
    return jsonStrLine.join("\n");
  } catch (e) {
    return "JSON 数据有误：" + e.toString();
  }
};
