{
   let docEl = document.documentElement,
    drp = window.devicePixelRatio || 1;
  let metaEl = document.querySelector("meta[name='viewport']");
  if (!metaEl) {
    metaEl = document.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    metaEl.setAttribute(
      "content",
      "width = device-width,user-scalable= no,initial-scale=1,maximun-scale=1"
    );
    document.head.append(metaEl);
  }
  function set2Rem() {
    const unit = 3.75;
    let rem = docEl.clientWidth / 100 > unit ? 100 : docEl.clientWidth / unit;
    console.log(docEl.clientWidth,"set2Rem",docEl.clientWidth / 100 > unit);
    docEl.style.fontSize = `${rem}px`;
  }
  set2Rem();
  window.addEventListener("resize",set2Rem);
  if(drp>=1){
        let testBody = document.createElement("body");
      let testDiv = document.createElement("div");
      testDiv.style.border = '0.5px solid transparent';
      testBody.appendChild(testDiv);
      docEl.appendChild(testBody);
      if(testDiv.offsetHeight === 1){
          docEl.classList.add("hairline")
      }
      docEl.removeChild(testBody)
  }
}
