// 1. Object Sub Type, Native Object
{
  var strPrimitive = "I'm string";
  typeof strPrimitive; // string
  strPrimitive instanceof String; // false

  var strObject = "I'm String";
  typeof strObject; // object
  strObject instanceof String; // true
}

// 2. Boxing, Auto Coercion(Literal -> Constructor)
{
  var strPrimitive = "I'm string";
  strPrimitive.length; // 13, String property
  strPrimitive.charAt(3); // m, String method
}

// 3. Key Access, Property Access
{
  var myObject = {
    a: 2,
  };

  myObject.a; // a, Key Access
  myObject["a"]; // a, Property Access
}

// 4. Computed Property Names
{
  var prefix = "foo";
  var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world",
  };

  myObject["foobar"]; // hello
  myObject["foobaz"]; // world
}

// 5. Reference
{
  function foo() {
    console.log("foo");
  }

  var someFoo = foo; // foo reference

  var myObject = {
    someFoo: foo, // foo reference
  };

  foo; // function foo() { ... }
  someFoo; // function foo() { ... }
  myObject.someFoo; // function foo() { ... }
}

// 6. Array Length
{
  var myArray = ["foo", 42, "bar"];
  myArray.baz = "baz";
  myArray.length; // 3, ignore

  myArray["3"] = "baz";
  myArray.length; // 4, change
}

// 7. Shallow Copy, Object.assign();
{
  function anotherFunction() {}

  var anotherObject = {
    c: true,
  };

  var anotherArray = [];

  var myObject = {
    a: 2,
    b: anotherObject, // reference
    c: anotherArray, // reference
    d: anotherFunction,
  };

  var newObject = Object.assign({}, myObject); // shallow copy

  newObject.a; // 2
  newObject.b === anotherObject; // true, original
  newObject.c === anotherArray; // true, original
  newObject.d === anotherFunction; // true, original
}

// 8. Propert Descriptor, Object.getOwnPropertyDescriptor()
{
  var myObject = {
    a: 2,
  };

  Object.getOwnPropertyDescriptor(myObject, "a"); // { value: 2, writable: true, enumerable: true, configurable: true }
}

// 9.Object.defineProperty()
{
  var myObject;

  // if configurable==true
  Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumberable: true,
  });

  myObject.a; // 2

  // (1) writable
  {
    var myObject = {};
    Object.defineProperty(myObjec, "a", {
      value: 2,
      writable: false,
      configurable: true,
      enumerable: true,
    });

    myObject.a = 3; // ignore
    myObject.a; // 2, strict mode) TypeError
  }

  // (2) Configurable
  {
    var myObject = {
      a: 2,
    };

    Object.defineProperty(myObject, "a", {
      value: 4,
      writable: true,
      configurable: false,
      enumerable: true,
    });

    myObject.a; // 4

    myObject.a = 5;
    myObject.a; // 5

    // TypeError
    Object.defineProperty(myObject, "a", {
      value: 6,
      writable: true,
      configurable: true,
      enumerable: true,
    });

    delete myObject.a; // ignore
    myObject.a; // 5
  }

  // (3) enumerable
  {
    var myObject = {};

    Object.defineProperty(myObject, "a", { value: 2, enumerable: false });
    Object.defineProperty(myObject, "b", { value: 3, enumerable: true });

    myObject.a; // 2
    for (var k in myObject) {
      console.log(k, myObject[k]); // b 3
    }

    myObject.propertyIsEnumerable("a"); // false
    myObject.propertyIsEnumerable("b"); // true

    Object.keys(myObject); // ['a'], enumerable property
    Object.getOwnPropertyNames(myObject); // ['a', 'b']
  }
}

// 10. Immutability
{
  // (1) Object Constant
  {
    var myObject = {};
    Object.defineProperty(myObject, "FAVORITE_NUMBER", {
      value: 42,
      writable: false,
      configurable: false,
    });
  }

  // (2) Object.preventExtensions()
  {
    var myObject = {
      a: 2,
    };

    Object.preventExtensions(myObject); // can't add

    myObject.b = 3; // ignore, strict mode) TypeError
  }

  // (3) Object.seal()
  {
    var myObject = {
      a: 2,
    };

    Object.seal(myObject); // Object.preventExtensions() + configurable false

    myObject.a = 3;
    myObject.a; // 3, enable
  }

  // (4) Object.freeze(), shallow freeze
  {
    var myObject = {
      a: 2,
    };

    Object.freeze(myObject); // Object.seal() + writable false

    myObject.a = 3; // ignore
  }
}

// 11. Property Access
{
  var myObject = { a: 2 };
  myObject.a; // 2, Property Access(= [[Get]] Operation)
}

// 12. Identifier Access
{
  var myObject = { a: undefined };
  myObject.a; // undefined, Property Access
  myObject.b; // undefined, Identifier Access (more work)
}

// 13. [[Put]]
{
  // (1) Accessor Descriptor? (Getter? or Setter?), yes) Setter Call
  // (2) no) Property writable false?, yes) TypeError
  // (3) no) Set Value
}

// 14. Accessor Descriptor
{
  var myObject = {
    // Getter
    get a() {
      return 2;
    },
  };

  Object.defineProperty(myObject, "b", {
    get: function () {
      return this.a * 2;
    },
    enumberable: true,
  });

  myObject.a; // 2
  myObject.b; // 4

  var myObject = {
    get b() {
      return this.a;
    },
    set b(val) {
      this.a = val * 2;
    },
  };

  myObject.b = 2; // a = 4
  myObject.b; // 4
  myObject.a; // 4
}

// 15. in operator, hasOwnProperty()
{
  var myObject = {
    a: 2,
  };

  // in operator, prototype chain
  "a" in myObject; // true
  "b" in myObject; // false

  // hasOwnProperty()
  myObject.hasOwnProperty("a"); // true
  myObject.hasOwnProperty("b"); // false
}

// 16. Iterate
{
  // (1) for-of
  {
    var myArray = [1, 2, 3]; // iterator Object
    for (var v of myArray) {
      console.log(v); // 1 2 3
    }

    var it = myArray[Symbol.iterator](); // get iterator

    it.next(); // [ value: 1, done: false ]
    it.next(); // [ value: 2, done: false ]
    it.next(); // [ value: 3, done: false ]
    it.next(); // [ done: false ]
  }

  // (2) custom iterator object
  {
    var myObject = {
      a: 2,
      b: 3,
    };

    Object.defineProperty(myObject, Symbol.iterator, {
      value: function () {
        var o = this; // myObject
        var idx = 0;
        var ks = Object.keys(o);

        // return object
        return {
          next: function () {
            return {
              value: o[ks[idx++]],
              done: idx > ks.length, // same) return true
            };
          },
        };
      },
      enumberable: false,
      writable: false,
      configurable: true,
    });

    var it = myObject[Symbol.iterator]();

    it.next(); // { value: 2, done: false }
    it.next(); // { value: 3, done: false }
    it.next(); // { value: undefined, done: true }

    for (var v of myObject) {
      console.log(v); // 2 3, enumerable false, Symbol.iterator Property exist
    }
  }

  // (3) custom iteartor sample
  {
    var randoms = {
      [Symbole.iterator]: function () {
        return {
          next: function () {
            value: Math.random();
          },
        };
      },
    };

    var random_pool = [];

    for (var n of randoms) {
      randoms_pool.push(n);

      if (random_pool.length === 100) break; // Prevent Infinity Loop
    }
  }
}
