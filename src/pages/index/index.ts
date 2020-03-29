import "./index.css"
import './index.txt'

let ps = new Promise((resolve,reject)=>{
    resolve('promise')
})
async function testAsync() {
    let a =await goudan();
    console.log(a)
}
 function goudan(){
  return new Promise((resolve,reject)=>{
        resolve('promise')
    })
}
console.log(goudan())
testAsync()

// Generator

function* helloGenerator() {
    console.log("this is generator");
  }
  let ge = helloGenerator()
  console.log(ge.next())