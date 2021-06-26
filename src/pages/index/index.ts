

function test(name:string){
    console.log(name);
    
}
test("afei")
let list:number[] = [1,2]
let list2:Array<number> = []
list2.push(3)

console.log(list2);

enum Color {Red=1, Green, Blue}
let c: Color = Color.Green
console.log(c,"c")


interface test {
    name?:string,
    readonly age:number,
    show(name:string):void,
    // [propName:string]:any
}

const b:test = {
    age:20,
    show(){
        console.log(this);
        
    }

}

console.log(b,"b");

function fanxing<T>(num:T[]):T[]{
    console.log(num.length);
    return num

}
const rs = fanxing(["1"]);
console.log(rs,"rs");

interface FN{
    <T>(arg:T):T
}

const fn :FN = function<T>(age:T):T{
    return age
}

class Sup {
    public name = "afei";
    private age=20;
    protected sex = '男'
}

class Sub extends Sup{

}
console.log(new Sub());
