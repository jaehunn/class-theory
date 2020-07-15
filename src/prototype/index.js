// 1. prototype, __proto__
{
  // 1. [[Get]]
  // 2. else, [[prototype]] link

  var another = {
    a: 2,
  };

  var myObject = Object.create(anotherObject); // [[prototype]] linking

  myObject.a; // 2, prototype chaining

  // myObject.__proto__ => anotherObject.prototype
  // anotherObject.__proto__ => Object.prototype

  // prototype chaining
  for (var k in myObject) {
    k; // a
  }

  "a" in myObject; // true
}

// 2. prototype shadowing (BAD)
{
  // directly present property > prototype property
  myObject.foo = "bar";

  // (1) prototype property exist, but writable: true -> directly present property setting (only shadowing case)
  // (2) else if writable: false -> setting is ignored
  // (3) else if setter -> setter call

  // (1) implicit shadowing case
  {
    var anotherObject = {
      a: 2,
    };

    var myObject = Object.create(anotherObject);
    anotherObject.a; // 2
    myObject.a; // 2

    anotherObject.hasOwnProperty("a"); // true
    myObject.hasOwnProperty("a"); // false

    myObject.a++; // implicit shadowing, myObject.a = myObject.a + 1;

    anotherObject.a; // 2
    myObject.a; // 3

    myObject.hasOwnProperty("a"); // true
  }
}

// 3. Class
{
}
