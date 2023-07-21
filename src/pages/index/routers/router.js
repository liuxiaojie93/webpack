import Home from "@/pages/index/views/home/index.vue"
console.log("Home",Home);
export const routes = [
    {
        path:"/",
        redirect:"index",
        // name:"index",
        // component:require("@/pages/index/views/home/index.vue"),
        // // component:Home,
        // meta:{
        //     title:'首页'
        // }
    },
    {
        path:"/index",
        name:"index",
        component:()=>import("@/pages/index/views/home/index.vue"),
        // component:Home,
        meta:{
            title:'首页'
        }
    }
]