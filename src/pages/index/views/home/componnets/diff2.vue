<template>
  <div>
    <!-- <pre id="display2"></pre> -->
    <div id="visual"></div>
    <div id="annotated"></div>

  </div>
</template>

<script>
import { diff,formatters } from "jsondiffpatch";
export default {
  data() {
    return {
      fragment:null
    };
  },
  props:{
    left:{
        type:[String,Number],
        default:''
    },
    right:{
        type:[String,Number],
        default:''
    }
  },
  watch:{
    left(){
        this.init()
    },
    right(){
        this.init()
    }
  },
  methods: {
    init() {
      const {left,right} = this
      var delta = diff(left, right);

      // beautiful html diff
      document.getElementById('visual').innerHTML =
        formatters.html.format(delta, left);
        document.getElementById('annotated').innerHTML =
        formatters.html.format(delta, right);

      // self-explained json
      // document.getElementById('annotated').innerHTML =
      //   formatters.annotated.format(delta, left);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style></style>
