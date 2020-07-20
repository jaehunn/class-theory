// namespace: internal module
// module: external module

// 1. namespace, module
{
  // (1) namespace
  {
    namespace Hello {
      function print() {
        console.log("Hello!");
      }
    }

    // compiled, loose augmentation in module pattern(exist or initialize)
    var Hello;
    (function Hello() {
        function print() {
            console.log("Hello!");
        }
    })(Hello || Hello = {});
  } 

  // (2) module keyword
  {
    module Hello {
      function print() {
        console.log("Hello!");
      }
    }

    // compiled, tight augmentation(Unconditionally, Hello initialized)
    (function (Hello) {
        function print() {
            console.log('Hello!');
        }
    })(Hello || Hello = {})
  }
}

// 2. Declare namespaces in one file
{
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

    MyInfo1.getName2(); // happy2
    MyInfo2.getName(); // happy1
}

// 3. Declare one namespace in files, logical grouping
{
    
    // reference path is not necessary when compiling project unit
    // (1) add reference path, compile only specific file(car2.ts)
    {
        // car1.ts
        namespace Car {
            export let auto: boolean = false;

            export interface ICar {
                name: string,
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

        Car.auto;
        Car.wheels; // cannot access

        // compile car2.ts -> car1.ts compiled too, then car1.js + car2.js
        // $ node car2.js -> car1.js commented, cannot access in car1.js
        // to solve, need to compile together (out option)
        // $ tsc --out out.js car2.ts
    }
}

// 4. namespace module
{
    // namespace -> module
    // after compiled, can be called explicitly. (import, require ...)
    // if namespace modules are declared in files, add alias to use
    
    // car1.ts
    export namespace Car {
        export let auto: boolean = false;

        export interface ICar {
            name: string;
            vendor: string; 
        }
    }

    // car2.ts
    import * as ns from './car1.ts'
    namespace Car {
        let wheels: number;
        ns.Car.auto; // false

        class Taxi implements ns.Car.ICar {
            name: string;
            vendor: string
        }
    }

    ns.Car.auto; // false

    // after compiled, create car1.js + car2.js (module option default value: commonjs)
}

// 5. namespace extension
{
    
}