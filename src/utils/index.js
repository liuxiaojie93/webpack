import Xue from  "./Xue"

// 防抖函数

function debounce(fn, delay, immediate) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let last;
  let timer = null;
  return function (...args) {
    let now = Date.now();
    const _this = this;
    if (last && now < (last + delay)) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(_this, args);
      }, delay);
    } else {
        last = now;
        fn.apply(_this, args);
    }
  };
}

const obj = {
  title:1,
  fn(){
    console.log("fn");
  },
  list:[{name:"afie"},2,[3,4]],
  age:null,
  sex:undefined
  // sex:undefined
}

function deepClone(obj={}){
  let finalObj ;
  if(typeof obj !== "object"){
    return finalObj = obj
  }
  
  finalObj = Array.isArray(obj)?[]:{};
  if(obj && Array.isArray(obj)){
    obj.map((i,index)=>{
      finalObj[index] = deepClone(i)
    })
    return finalObj
  }else if (obj){
    const keys = Object.keys(obj);
    for( let k of keys){
      finalObj[k] = deepClone(obj[k]);
    }
    return finalObj
  }else{
    return finalObj = obj
  }
}
const res = deepClone(obj);
res.title=2;
res.age =29;
res.list[2].push(33);
res.list[0].name = "goudan"
// res.fn = function(){
//   console.log("fn2");
// }

console.log("res",res , obj);
console.log(res.fn === obj.fn);
export { debounce, throttle,deepClone };
