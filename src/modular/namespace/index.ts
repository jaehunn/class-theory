// 1. namespace declaration

namespace Hello {
  function print() {
    console.log("hello!");
  }
}

// 2. Loose Augmentation

{
  var Hello;
  (function (Hello) {
    function print() {
      console.log("hello!");
    }
  })(Hello || (Hello = {}));
}

// 3. Tight Augmentation

{
  var Hello;
  (function (Hello) {
    function print() {
      console.log("hello!");
    }
  })((Hello = {}));
}

// 4. case 1: In one file
// namespace is hoisted

namespace MyInfo1 {
  export let name = "happy1";
  export function getName2() {
    return MyInfo2.name2;
  }
}

namespace MyInfo2 {
  export let name2 = "happy2";
  export function getName() {
    return MyInfo1.name;
  }
}

// 5. case 2: In files
// compile specific file -> add reference path
// car2.js -> not executed (reference path became comment) To solve, combine two files

// car1.ts
namespace Car {
  export let auto: boolean = false;
  export interface ICar {
    name: string;
    vendor: string;
  }
}

// car2.ts
/// <reference path="car1.ts" />
namespace Car {
  let wheels: number;
  console.log(auto);

  class Taxi implements ICar {
    name: string;
    vendor: string;
  }
}

console.log(Car.auto);
// console.log(Car.wheels); -> Error!

// 6. namespace module
export namespace Car {
  export let auto: boolean = fals;
}
