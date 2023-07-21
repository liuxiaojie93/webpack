import Router from "vue-router"
import Vue from "vue"
import {routes} from "./router"

Vue.use(Router)

export const router = new Router({
    routes
})

router.beforeEach((to,from,next)=>{
    console.log("beforeEach",to,from);
    next()
})