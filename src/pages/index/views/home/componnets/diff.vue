<template>
  <div>
    <pre id="display"></pre>
  </div>
</template>

<script>
import { Diff, diffChars, diffJson } from "diff";
export default {
  data() {
    return {
      fragment: null,
    };
  },
  props: {
    left: {
      type: [String, Number],
      default: "",
    },
    right: {
      type: [String, Number],
      default: "",
    },
  },
  watch: {
    left() {
      this.init();
    },
    right() {
      this.init();
    },
  },
  methods: {
    init() {
      let { fragment } = this;
      let color = "";

      let span = null;
      const diff = diffJson(this.left, this.right),
        display = document.getElementById("display");
        display.innerHTML =''
      if (!fragment) {
        fragment = document.createDocumentFragment();
      }

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
