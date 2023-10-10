<template>
  <div>
    <div class="input-wrapper">
      <div class="fl">
        <textarea class="textarea" v-model="data1" rows="10"></textarea>
      </div>
      <div class="fr">
        <textarea class="textarea" v-model="data2" rows="10"></textarea>
      </div>
    </div>
    <!-- <div class="jsonFormate">
      <pre>{{jsonData}}</pre>
    </div> -->
    <!-- <diff :left="data1" :right="data2" /> -->
    <div class="line"></div>
    <diff3 :left="data1" :right="data2" />
  </div>
</template>

<script>
import moment from "moment";
import pic from "@/assets/images/cyq.jpg";
import diff from "./componnets/diff.vue";
import diff3 from "./componnets/diff3.vue";
import {parseJSONData1,parseJSONData2 } from "./json2"

export default {
  components: { diff, diff3 },
  data() {
    return {
      pic,
      data1: parseJSONData1,
      data2: parseJSONData2,
    };
  },
  computed:{
    jsonData(){
      return JSON.parse(this.data2)
    }
  }
};
</script>

<style lang="less">
.input-wrapper {
  display: flex;
  .fl {
    margin-right: 20px;
    flex: 1;
    width: 40%;
  }
  .fr {
    flex: 1;
    width: 40%;
  }
  .textarea {
    width: 100%;
    display: block;
  }
}
.line {
  height: 1px;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}
</style>
