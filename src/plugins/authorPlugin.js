class EntryOptionPlugin{
    constructor(options){
      this.options = options;
    }
    apply(compiler){
        compiler.hooks.emit.tap("EntryOptionPlugin",(compilation)=>{
            const options = this.options
            // for (const name of Object.keys(entry)) {
            //     console.log(name,entry,"EntryOptionPlugin")
            // }
            return new Promise((resolve, reject) => {
                const assets = compilation.assets
                Object.keys(assets).forEach(e => {
                    let source = assets[e].source()
                    let info = []

                    if (options.author) info.push(`@Author: ${options.author}`)
                    if (options.email) info.push(`@Email: ${options.email}`)
                    if (options.homepage) info.push(`@Homepage: ${options.homepage}`)

                    if (info.length) {
                        info.push(`@Date: ${new Date()}`)
                        source = `/*\n  ${info.join('\n\n  ')}\n*/\n${source}`
                    }

                    compilation.assets[e].source = () => source
                    compilation.assets[e].size = () => source.size
                })
                resolve()
            })
        })

    }

}
module.exports = EntryOptionPlugin