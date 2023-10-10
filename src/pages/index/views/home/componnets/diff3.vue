<template>
  <div v-highlight v-html="prettyHtml" />
</template>

<script>
import * as Diff2Html from "diff2html";
import { createPatch } from "diff";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
export default {
  directives: {
    highlight: function (el) {
      const blocks = el.querySelectorAll("code");
      blocks.forEach((block) => {
        const remart = block.querySelector(".data-remark-test")
        let str = ''
        if(remart && remart.dataset){
          str = `// ${remart.dataset.remarks}`
          block.append(str)
        }
        console.log("remart",remart);
        hljs.highlightBlock(block);
      });
    },
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
  computed: {
    prettyHtml() {
      function hljs(html) {
        return html.replace(
          /<span class="d2h-code-line-ctn">(.+?)<\/span>/g,
          '<span class="d2h-code-line-ctn"><code>$1</code></span>'
        );
      }
      let oldString = this.left;
      let newString = this.right;
      const args = [
        "test.json",
        oldString,
        newString,
        "",
        "",
        { context: 1000 },
      ];
      const dd = createPatch(...args);

      const outStr = Diff2Html.parse(dd, {
        inputFormat: "diff",
        outputFormat: "side-by-side",
        srcPrefix: "abc",
        drawFileList: true,
        matching: "lines",
        renderNothingWhenEmpty: false,
      });
      console.log("outStr", outStr);
      let html = Diff2Html.html(outStr, {
        inputFormat: "json",
        outputFormat: "side-by-side",
         srcPrefix: "abc",
        drawFileList: true,
        matching: "lines",
        renderNothingWhenEmpty: false,
      });
      console.log("html", html);
      const newHtml = html.replace(
        /&quot;<ins>&lt;span data-remarks=&#x27;(.+?)&#x27;&gt;(.+?)&lt;&#x2F;span&gt;<\/ins>&quot;/g,
        '<div class="data-remark-test" data-remarks="$1" style="display:inline">$2</div>'
      );

      // const newHtml = html.replace(/&quot;&lt;span data-remarks=&#x27;(.+?)&#x27;&gt;(.+?)&lt;&#x2F;span&gt;&quot;/g, '<div class="data-remark-test" data-remarks="$1" style="display:inline">$2</div>')
      // return html
      return hljs(newHtml);
    },
  },
  mounted() {
    this.addEvent();
  },
  methods: {
    addEvent() {
      document
        .querySelector(".data-remark-test")
        .addEventListener("click", (e) => {
          console.log("e", e);
          alert(e.target.dataset.remarks);
        });
    },
  },
};
</script>
<style lang="less">
@import url("./diff3.less");
/deep/ td.d2h-code-side-linenumber.d2h-ins {
  display: none;
}

/deep/ td.d2h-code-side-linenumber.d2h-cntx {
  display: none;
}

/deep/ td.d2h-code-side-linenumber.d2h-del {
  display: none;
}

/deep/ tr td:first-child {
  display: none;
}
/deep/ span.d2h-code-line-prefix:first-child {
  display: none;
}
</style>
