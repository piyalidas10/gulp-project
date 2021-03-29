"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function sum() {
  var sum = 0;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var arg = _args[_i];
    sum += arg;
  }

  return sum;
}

var x = sum(4, 9, 16, 25, 29, 100, 66, 77);
console.log('x => ', x);
document.getElementById("demo").innerHTML = x;

var Person = /*#__PURE__*/function () {
  function Person(fname, lname) {
    _classCallCheck(this, Person);

    this.fname = fname;
    this.lname = lname;
  }

  _createClass(Person, [{
    key: "fullname",
    get: function get() {
      return this.fname + "-" + this.lname;
    }
  }]);

  return Person;
}();

var person = new Person('Piyali', 'Das');
document.getElementById("name").innerHTML = person.fname + " " + person.lname;
console.log(person);