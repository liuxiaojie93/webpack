console.log("about")
import "./index.css"

let newVersion = "oppostore/100200 brand/iPhone model/iPhone6sPlus IOS/13.2.3";
let old = "oppostore/100200 IOS/13.2.3";
let u = window.navigator.userAgent;
let uReg=/oppostore\/(\d+)(*?)[ ](\w+)\/\w?/;
let RS = u.match(uReg);
let client = RS && RS[2];
let appversion = client && RS[1] ;
let isIOS = client && client.toLocaleLowerCase()==="ios"?true:false
