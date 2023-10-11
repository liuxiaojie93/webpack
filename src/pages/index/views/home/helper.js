import  jsonpath  from 'jsonpath';
// 废弃
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
    let jsonStr = JSON.stringify(originStr, null, 4);
    let jsonStrLine = jsonStr.split("\n"); // 解析后的数据
    return jsonStrLine.join("\n");
  } catch (e) {
    return "JSON 数据有误：" + e.toString();
  }
};

const transformObj = (data,remarkMap,parentPath='')=>{
    let newData = {};
    for (const [k,v] of  Object.entries(data)) {
        const currentPath = parentPath?`${parentPath}.${k}`:`${k}`
        let newKeyName = k
        if(remarkMap[currentPath]){
            newKeyName = `<span data-code-annotation=${remarkMap[currentPath]}>${k}</span>`
        }
        if(typeof v === 'object' && v){
            if(Array.isArray(v)){
                newData[newKeyName] = v.map(i=>{
                    return transformObj(i,remarkMap,currentPath)
                } )
            }else{
               
                newData[newKeyName]  = transformObj(v,remarkMap,currentPath)
            }
        }else {
            newData[newKeyName]  = v 
        }
    }
    return newData
}

export const jsonJoinRemak = (json,remarkMap)=>{
    console.log("Data",json);
    const newData = transformObj(json,remarkMap)
    console.log("newData",newData);
    return newData
}