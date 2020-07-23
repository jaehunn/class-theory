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
    // upper namespace -> lower namespace
    namespace Animal {
        export function run() {
            console.log("Animal runs");
        }

        Animal.Land.run(); // do not call lower namespace
    }

    namespace Animal.Land {
        Animal.run(); // call upper namespace

        export function run() {
            console.log("Land animal runs");
        }
    }

    namespace Animal.Land.Pet {
        Animal.Land.run(); // call upper namespace

        export function run() {
            console.log("Pet runs");
        }

        export class Cat {
            run() {
                Animal.Land.Pet.run();
            }
        }
    }

    let cat = new (Animal.Land.Pet).Cat();
    cat.run(); // Animal runs Land animal runs Pet runs
    
    // in the above code, if namespace is used as a module
    export namespace Animal{}
    export namespace Animal.Land{}
    export namespace Animal.Land.Pet{}

    // import upper namespace 
    import { Animal } from './';
    Animal.run();
    Animal.Land.run();
    Animal.Land.Pet.run();
}

// 6. in browser, call namespace module 
{
    // when typescript compiled, use out option
    // but in browser, compile individually and know without using import keyword
    
    // number-validator.ts
    namespace Validator {
        export class NumberValidator {
            isNumber(s: any): boolean {
                if (typeof s === 'number' || s instanceof Number) return true;
                else return false;
            }
        }
    }

    // string-validator.ts

    /// <reference path="number-validator.ts"/ >
    namespace Validator {
        export class StringValidator {
            isString(s: any): boolean {
                if (typeof s ==='string' || s instanceof String) return true;
                else return false
            }
        }
    }

    let stringValidator = new Validator.StringValidator();
    let numberValidator = new Validator.NumberValidator();

    stringValidator.isString('hello'); // true
    numberValidator.isNumber(123); // true

    // test.html
    // in order, it works even if reference path is commented.
    <body>
        <script src="number-validator.js" type="text/javascript"></script>
        <script src="number-validator.js" type="text/javascript"></script>    
    </body>
}

// 7. module
{
    // (1) re-export
    {
        // modules.ts
        export * from './module1';
        export * from './module2';

        // import-as.ts
        import * as m from './modules';
    }

    // (1) namespace re-export
    {
        // engine-ts
        export class Engine {
            constructor(public name: string) {}
            getName() {
                return this.name;
            }
        }

        // my-car.ts
        export class MyCar {
            constructor(public name: string) {}

            getName() {
                return this.name;
            }
        }

        export { Engine as SuperEngine } from './engine'

        // car-info.module.ts
        import { MyCar as SuperCar, SuperEngine } from './my-car';

        export namespace CarInfo {
            export let car = SuperCar;
            export let engine = SuperEngine;
            export function Hello() {
                console.log('hello');
            }
        }
        

        // load-car-info.ts
        import { CarInfo } from './car-info.module';
        
        CarInfo.Hello(); // hello

        let car = new CarInfo.car('My Car');
        car.name; // My Car

        let engine = new CarInfo.engine('My Engine');
        engine.name; // My Engine
    }
} 

// 8. default module 
{
    // (1) import default module, use alias
    {
        // default.ts
        const p = {
            name: 'happy',
            age: 30
        }

        const h: string = 'hello ts!';

        export { p as default, h as hello };

        // load-default.ts
        import p, { hello } from './default.ts' // import default module, normal module
    }

    // (2) export module + type
    {
        // export.ts
       interface HelloMessage {
           first: string; 
           second: string;
       }

       function HelloMessage(name: string): HelloMessage {
           let message: HelloMessage = { first: 'hello', second: name };
           return message;
       }

       export default HelloMessage;

       // import.ts
       import hello from './export';

       let helloMessage: hello = hello('hello');
       hello('hello'); // { first: 'hello', second: 'hello' }
       helloMessage; // { first: 'hello', second: 'hello' }

       // compiler understood whether function or type (type inspection)
    }
}