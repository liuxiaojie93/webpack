<template>
  <div v-highlight v-html="prettyHtml" />
</template>

<script>
import * as Diff2Html from "diff2html";
import { createPatch } from "diff";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
// import "diff2html/bundles/css/diff2html.min.css";
export default {
  directives: {
    highlight: function (el) {
      const blocks = el.querySelectorAll("code");
      blocks.forEach((block) => {
        const remart = block.querySelector(".data-code-annotation");
        let str = "";
        if (remart && remart.dataset && remart.dataset.codeAnnotation) {
          str = `// ${remart.dataset.codeAnnotation}`;
          block.append(str);
        }
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
    renderWhenNoDiff: {
      type: Boolean,
      default: false,
    },
    fineName:{
       type: String,
      default: "",
    }
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
      // 文件无变化时添加标识
      if(this.renderWhenNoDiff){
        oldString =
          "File Without Change\tOldString: ======================== \n" +
          oldString;
        newString =
          "File Without Change\tNewString: ======================== \n" +
          newString;
      }
      const args = [
        "", // fileName
        oldString,
        newString,
        "",
        "",
        { context: 3000 },
      ];
      const dd = createPatch(...args);
      const outStr = Diff2Html.parse(dd, {
        inputFormat: "diff",
        outputFormat: "side-by-side",
        srcPrefix: "abc",
        drawFileList: false,
        matching: "lines",
      });
      console.log("outStr", outStr);
      // 文件无变化时也展示内容
      if (this.renderWhenNoDiff) {
        outStr.map((str) => {
          for (const k of str.blocks) {
            k.lines = k.lines.filter(
              (s) =>
                !s.content.startsWith("-File Without Change") &&
                !s.content.startsWith("+File Without Change")
            );
          }
        });
      }

      let html = Diff2Html.html(outStr, {
        inputFormat: "json",
        outputFormat: "side-by-side",
        srcPrefix: "abc",
        drawFileList: false,
        matching: "lines",
      });
      console.log("html", html);

      const newHtml = html.replace(
        /&quot;&lt;span data-code-annotation=(.+?)&gt;(.+?)&lt;&#x2F;span&gt;&quot;/g,
        '<div class="data-code-annotation" data-code-annotation="$1" style="display:inline">$2</div>'
      );

      // const newHtml = html.replace(
      //   /&quot;<ins>&lt;span data-remarks=&#x27;(.+?)&#x27;&gt;(.+?)&lt;&#x2F;span&gt;<\/ins>&quot;/g,
      //   '<div class="data-remark-test" data-remarks="$1" style="display:inline">$2</div>'
      // );
      return hljs(newHtml);
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
.hljs-comment {
  color: rgba(0, 0, 0, 0.3);
}
</style>
