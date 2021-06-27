// 防抖函数

function debounce(fn, delay, immediate) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let last;
  let timer = null;
  return function (...args) {
    let now = Date.now();
    const _this = this;
    if (last && now < (last + delay)) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(_this, args);
      }, delay);
    } else {
        last = now;
        fn.apply(_this, args);
    }
  };
}
export { debounce, throttle };
