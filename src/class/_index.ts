// 1. declaration and creation
{
  class Rectangle {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    getArea(): number {
      return this.x * this.y;
    }
  }

  // intantiate, assign Rectangle object(=new Rectangle) Object reference variable(=rectangle)
  let rectangle = new Rectangle(1, 5);

  let area: number = rectangle.getArea(); // access member method(=getArea)

  area; // 5

  // compile code (js file)
  {
    // assign constructor function (function() {})()
    // constructor function, module pattern (use closure -> encapsulation)
    var Rectangle = (function () {
      function Rectangle(x, y) {
        this.x = x;
        this.y = y;
      }

      // prototype chaining
      Rectangle.prototype.getArea = function () {
        return this.x + this.y;
      };

      return Rectangle;
    })();

    var rectangle = new Rectangle(1, 5);

    var area = rectangle.getArea();

    area;
  }
}

// 2.inheritance and inclusion
{
  // typescript = single inheritance

  // (1) inheritance
  {
    class Animal {} // base class, super class

    // derived class, sub class
    class Horse extends Animal {
      constructor() {
        super(); // super class constructor call
      }
    }
  }
  // (2) inclusion-composition
  {
    class Engine {}
    class Car {
      private engine;
      constructor() {
        this.engine = new Engine(); // strong relation, Car create/remove -> Engine create/remove
      }
    }

    let myCar = new Car(); // create
    myCar = null; // remove
  }
  // (3) inclusion-aggregation
  {
    class Engine {}
    class Car {
      private engine: Engine;
      constructor(engine: Engine) {
        this.engine = engine; // Weak relation
      }
    }

    let engine = new Engine();
    let car = new Car(engine); // throw object
  }

  // (4) inheritance + inclusion
  {
    class Flashlight {
      constructor(public lightIntensity) {}
    }

    class Bicycle {
      constructor(public numberOfWheel: number) {}

      getNumberOfWheel(): number {
        return this.numberOfWheel;
      }
    }

    // inheritance
    class MountainBike extends Bicycle {
      flashlight: Flashlight;

      constructor(public numberOfWheel: number, public hasBackSaddle: boolean) {
        super(numberOfWheel);

        this.flashlight = new Flashlight(90); // inclusion-composition
      }

      getHasBackSaddle() {
        return this.hasBackSaddle;
      }

      getNumberOfWheel() {
        return this.numberOfWheel;
      }
    }

    let hasBackSaddle = true;
    let numberOfWheel = 2;
    let mountainBike = new MountainBike(numberOfWheel, hasBackSaddle);

    mountainBike.getHasBackSaddle; // true
    mountainBike.getNumberOfWheel; /// 2
  }
}

// 3. access modifier
{
  // access range: public > protected > private
}

// 4. abstract
{
}

// 5. interface
{
}

// 6. overriding
{
}

// 7. overloading
{
}

// 8. polymorphism
{
}

// 9. static
{
}

// 10. readonly modifier
{
}
