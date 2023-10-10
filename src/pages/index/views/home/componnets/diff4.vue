<template>
  <div>
    <pre id="display4"></pre>
  </div>
</template>

<script>
import moment from "moment";
import pic from "@/assets/images/cyq.jpg";
import { Diff, diffChars,diffJson } from "diff";
console.log("Diff", Diff);
import {js1,js2} from "../json2"
export default {
  data() {
    return {
      pic,
      js1,
      js2
    };
  },
  methods: {
    init() {
      const one = "beep boop",
        other = "beep boob blah",
        color = "";

      let span = null;

      const diff = diffJson(js1, js2),
        display = document.getElementById("display4"),
        fragment = document.createDocumentFragment();

      diff.forEach((part) => {
        // green for additions, red for deletions
        // grey for common parts
        const color = part.added ? "green" : part.removed ? "red" : "grey";
        span = document.createElement("span");
        span.style.color = color;
        span.appendChild(document.createTextNode(part.value));
        fragment.appendChild(span);
      });

      display.appendChild(fragment);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style></style>
