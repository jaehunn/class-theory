// internal module: namespace
// 1. declare
namespace Hello {
  function print() {
    console.log("hello!");
  }
}

// 2. hoisted (one file)
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

// 3. reference path (files)
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
// console.log(Car.wheels); -> error

// 4. namespace module
// car1.ts
export namespace Car {
  export let auto: boolean = false;
  export interface ICar {
    name: string;
    vendor: string;
  }
}

// car2.ts
import * as ns from "./car1"; // import alias
export namespace Car {
  let wheels: number;

  console.log(ns.Car.auto);

  class Taxi implements ns.Car.ICar {
    name: string;
    vendor: string;
  }
}

// 6. namespace extension
namespace Animal {
  export function run() {
    console.log("Run animal");
  }

  // Animal.Land.run(); -> Error, Sub namespace
}

namespace Animal.Land {
  Animal.run();

  export function run() {
    console.log("Run land animal");
  }
}

namespace Animal.Land.Pet {
  Animal.Land.run();

  export function run() {
    console.log("Run land pet animal");
  }

  export class Cat {
    run() {
      Animal.Land.Pet.run();
    }
  }
}

let cat = new Animal.Land.Pet.Cat();
cat.run();

// 7. export namespace extension
export namespace Animal {
  //...
}

export namespace Animal.Land {
  // ...
}

export namespace Animal.Land.Pet {
  // ...
}

import { Animal } from "./animal"; // import only 'root' namespace
Animal.run();
Animal.Land.run();
Animal.Land.Pet.run();

// 7. runtime, typescript recognization
// numberValidator.ts
namespace Validator {
  export class NumberValidator {
    isNumeric(s: any): boolean {
      if (typeof s === "number" || s instanceof Number) return true;
      return false;
    }
  }
}

// stringValidator.ts
// reference path -> (compile) -> comment, cannot access
/// <reference path="numberValidator.ts" />
namespace Validator {
  export class StringValidator {
    isString(s: any): boolean {
      if (typeof s === "string" || s instanceof String) return true;
      return false;
    }
  }
}

// to solve
// test.html
<script src="numberValidator.js" type="text/javascript"></script>
<script src="stringValidator.js" type="text/javascript"></script>