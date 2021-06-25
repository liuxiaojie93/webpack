## class 类继承原理及实现

> ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

> 继承原理：
> 1、原型对象内属性继承方式 Sub.prototype = Object.create(Sup.prototype)
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