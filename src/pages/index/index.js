const { map } = require("jquery");

console.log("index");
import './index.less'
const a = Symbol.for("aa")
if(a){
    console.log("enter",a==true,a);
}
const b = Symbol.for("aa");
let bb ;

const aset = new Set("")
aset.add(3)
aset.delete(3)
aset.add({t:1})
aset.add(undefined)
console.log("aset",aset);


const aMap = new Map();
aMap.set("a",1)
aMap.set("a",2)
aMap.set("b",2)



const obj1 = {
    a:1,
    [Symbol.iterator] : function () {
        console.log("enter");
        return {
          next: function () {
            return {
              value: 1,
              done: true
            };
          }
        };
     }
}

for (let i of obj1){
    console.log(i,"interator");
}
