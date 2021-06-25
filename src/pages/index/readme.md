## 一、proxy && reflect

```javascript
const px = new Proxy(obj1, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
});

console.log(px);
```

#### 1、元编程（在语言层面修改逻辑，扩展语言自身能力）

    引入的意义:
    1、功能更加强大，相比Object.defineProperty只能监听对象的读写操作，proxy可以监听
        ( get: 读取某个属性
            set: 写入某个属性
            has: in 操作符调用
            deleteProperty: delete操作符调用
            getProperty: Object.getPropertypeOf()
            setProperty: Object.setProtoTypeOf()
            isExtensible: Object.isExtensible()
            preventExtensions: Object.preventExtensions()
            getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor()
            defineProperty: Object.defineProperty()
            ownKeys: Object.keys(), Object.getOwnPropertyNames(), Object.getOwnPropertSymbols()
            apply: 调用一个函数
            construct: 用new调用一个函数。
        ）等操作
        2、 非侵入性

## 二、Iterator（遍历器）

    作用:为所有的数据结构提供统一的接口访问机制，Iterator 接口主要供for...of消费，一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable），ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”

```javascript
var it = makeIterator(["a", "b"]);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
```

```js
const obj1 = {
  a: 1,
  [Symbol.iterator]: function () {
    console.log("enter");
    return {
      next: function () {
        return {
          value: 1,
          done: true,
        };
      },
    };
  },
};

for (let i of Object.keys(obj1)) {
  console.log(obj1[i], "interator");
}
```

#### 调用 Iterator 接口的场合

（1）解构赋值

```js
let set = new Set().add("a").add("b").add("c");
let [x, y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
```

（2）扩展运算符

```js
// 例一
var str = "hello";
[...str]; //  ['h','e','l','l','o']

// 例二
let arr = ["b", "c"];
["a", ...arr, "d"];
// ['a', 'b', 'c', 'd']
```

（3）解构赋值

```js
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};

var iterator = generator();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }
```

（4）其他场合

```js
    for...of
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    Promise.all()
    Promise.race()
```

跟其他遍历方法的比较：

```js
    for ... in 主要用来遍历对象
    for（let i,i<arr.length,i++）复杂
    forEach（）{} 无法退出循环
```

## 三、Generator

    概念：状态机 + 遍历器生成器,for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

var hw = helloWorldGenerator();
```

迭代器

```js
function* yieldObj(obj) {
  const keys = Reflect.ownKeys(obj);
  for (let propKey of keys) {
    yield [propKey, obj[propKey]];
  }
}

for (let i of yieldObj(obj1)) {
  console.log(i);
}
```

异步解决方案

```js
function* gen() {
  console.log(11);
  yield fetch();
  console.log(22);
}
const fe = gen();
function fetch() {
  setTimeout(() => {
    console.log("fetched");
    fe.next();
  }, 3000);
}
fe.next();
```

## 四、class 类

> ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

> 继承原理：
> 1、原型对象内属性继承 Sub.prototype = Object.create(Sup.prototype)
> 2、实例属性继承 通过Super.call(this,args) 给子项绑定实例属性

```js
//编译前
class Sup {
  constructor(name, sex) {
    this.name = name;
    this.sex = sex;
  }
  showName() {
    console.log(this.name);
  }
  static supHello() {
    console.log(12);
  }

  // ...
}

class Sub extends Sup {
  constructor(name, sex, age) {
    super(name, sex);
    this.age = age;
  }
  showAge() {
    console.log(this.age);
  }
}

// 编译后
var Sup = /*#__PURE__*/ (function () {
  function Sup(name, sex) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(
      this,
      Sup
    );

    this.name = name;
    this.sex = sex;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(
    Sup,
    [
      {
        key: "showName",
        value: function showName() {
          console.log(this.name);
        },
      },
    ],
    [
      {
        key: "supHello",
        value: function supHello() {
          console.log(12);
        }, // ...
      },
    ]
  );

  return Sup;
})();

var Sub = /*#__PURE__*/ (function (_Sup) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(
    Sub,
    _Sup
  );

  function Sub(name, sex, age) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(
      this,
      Sub
    );

    _this =
      _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(
        this,
        _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(
          Sub
        ).call(this, name, sex)
      );
    _this.age = age;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(
    Sub,
    [
      {
        key: "showAge",
        value: function showAge() {
          console.log(this.age);
        },
      },
    ]
  );

  return Sub;
})(Sup);

// es5 模拟
function inherits(Sub, Sup) {
  Sub.prototype = Object.create(Sup.prototype);
  // TODO 静态属性、方法继承
}

function classCallCheck(context,parent){
    if(!(context instanceof parent)){
        throw("Cannot call a class as a function")
    }
}

function Super(name) {
  classCallCheck(this,Super)
  this.name = name;
}

Super.prototype.showName = function () {
  console.log(this.name);
};

const Suber = (function (_Super) {

  inherits(Suber, _Super);

  function Suber(name, age) {

    classCallCheck(this,Suber)

    var _this;
    if (_this === undefined) {
      _Super.call(this, name);
      _this = this;
    }
    console.log(_this, this);
    _this.age = age;
    return _this;
  }
  return Suber;
})(Super);

```