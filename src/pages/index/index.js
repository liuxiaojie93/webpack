console.log("index");
// es6 api & syntax

const a = 100;
let arr = [1,2,4,[5,6]]
const fn = ()=>{
    return a
}
const asyncFn = async ()=>{}
const rs = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve({code:200})
    },1000)
})
const b= [...arr];
const c = arr.flat(2);
console.log(a,b,c);