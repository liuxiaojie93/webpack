const {log} = console
class Super {
    readonly numberOfLegs: number = 8;
    static origin = {x: 0, y: 0};
    constructor(public name: string,protected sex:number,private age:number) {

    }
    get fullName():string{
        return `my name is ${this.name}`
    }
    set fullName(newName:string){
        this.name = newName;
        console.log(origin)
    }
    showInfo(){
        log('showInfo:',this.name,this.age,this.sex)
    }
}
class Suber extends Super{
    constructor(name,sex,age){
        super(name,sex,age);
    }
    showName(){
        log("showName:",this.name)
    }
    showSex(){
        log("showSex:",this.sex)
    }
}
const sup = new Super('afei',1,20);
const sub = new Suber('goudan',0,22);
sub.showSex()
sub.showInfo() // afei

let add:(x:number,y:number)=>number= (x,y) => x+y;
// let add= (x:number=1,y:number=4):number => x+y;
log(add(2,4))

