import Vue from "vue"
import App from "./App.vue"
import {router} from "./routers"
import {store} from "./store"

let app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
console.log("app",app);