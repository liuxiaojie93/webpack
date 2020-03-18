console.log("about")
import "./index.css"
import $ from "jquery"
import domready from "domready"
domready(()=>{
    const $body = $("body")
    console.log($body)
})
