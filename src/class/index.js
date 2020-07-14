// 1. Inheritance = Copy
{
  // Pseudo Code
  class Vehicle {
    engines = 1;

    ignition() {
      console.log("Engine On");
    }

    drive() {
      ignition(); // SpeedBoat.ignition(), Polymorphism

      console.log("Go ahead");
    }
  }

  class Car extends Vehicle {
    wheels = 4;

    drive() {
      // super: Relative Reference
      super.drive(); // Vehicle.driver(), Polymorphism
    }
  }

  class SpeedBoat extends Vehicle {
    engines = 2;

    ignition() {
      console.log(engines + "Engines On");
    }

    pilot() {
      super.drive(); // Vehicle.drive(), Polymorphism
      console.log("Go ahead!!");
    }
  }
}

// JavaScript Inheritance is not copy, but connect

// 2. Mixin, JavaScript Copy Utility
{
  // (1) Explicit Mixin
  {
    function mixin(sourceObj, targetObj) {
      for (var key in sourceObj) {
        if (!(key in targetObj)) targetObj[key] = sourceObj[key];
      }

      return targetObj;
    }

    var Vehicle = {
        engines = 1,

        ignition: function () {
            console.log("Engine On");
        },

        drive: function () {
            this.ignition();

            console.log('Go ahead');
        }
    };
    
    // function reference copy, not function copy
    var Car = mixin(Vehicle, {
        wheel: 4,

        // not override, shadowing
        drive: function () {
            // Vehicle.drive(), 'this' bind to Vehicle
            // so, have to use call('Car' context)
            Vehicle.drive.call(this); // Explicit pesudo polymorphism, javascript don't have relative reference

            console.log(this.wheel + "Go ahead");
        }
    });
  }

  // (2) Implicit Mixin
  {
    var Something = {
        cool: function () {
            this.greeting = "Hello World";
            this.count = this.count ? this.count + 1 : 1;
        }
    };

    Something.cool();
    Something.greeting; // Hello World
    Something.count; // 1

    var Another = {
        cool: function () {
            // Implicit Mixin, Another <- Something
            // Context re-binding
            Something.cool.call(this);
        }
    }

    Another.cool();
    Another.greeting; // Hello World
    Another.count; // 1, no share
  }
}

// 3. Parasitic Inheritance
{
    function Vehicle() {
        this.engines = 1;
    }

    Vehicle.prototype.ignition = function () {
        console.log("Engine On")
    }

    Vehicle.prototype.drive = function () {
        this.ignition();

        console.log('Go ahead')
    }

    // Parasitic Class
    function Car() {
        var car = new Vehicle();

        car.wheels = 4;

        // Privileged reference, Vehicle::drive()
        var vehDrive = car.drive;

        // override
        car.drive = function () {
            vehDrive.call(this);

            console.log(
                this.wheels + 'Go ahead'
            )
        } 

        return car; // return instance itself
    }

    var myCar = new Car(); // == var myCar = Car() (Decreasing Garbage Collection)

    myCar.drive(); // Engine On Go ahead 4 Go ahead
}