const fs = require("fs")
const path = require("path")
class cleanConsolePlugin{
    constructor(options){
      this.options = options;
    }
    apply(compiler){
        for(var hook of Object.keys(compiler.hooks)){
            console.log('hook:',hook)
            fs.writeFile(path.resolve(__dirname,"../log/log.js"),hook.toString(),'utf8',function(){

            })
        }
        compiler.hooks.emit.tap("cleanConsolePlugin",(compilation)=>{
            return new Promise((resolve, reject) => {
                const assets = compilation.assets
                Object.keys(assets).forEach(e => {
                    let source = assets[e].source();
                    
                    let regConsole = /console.log\(*?\)/g;
                    source.replace(regConsole,'')
                    compilation.assets[e].source = () => source
                    compilation.assets[e].size = () => source.size
                })
                resolve()
            })
        })

    }

}
module.exports = cleanConsolePlugin