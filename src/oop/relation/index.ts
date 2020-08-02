// inheritance
{
  class Animal {}
  class Horse extends Animal {
    constructor() {
      super(); // parent(= Animal) constructor call
    }
  }
}

// inclusion (composition: strong)
{
  class Engine {}
  class Car {
    private engine;
    constructor() {
      this.engine = new Engine(); // inner
    }
  }

  let myCar = new Car();
  myCar = null;
}

// inclusion (aggregation: weak)
{
  class Engine {}
  class Car {
    private engine: Engine;
    constructor(engine: Engine) {
      this.engine = engine;
    }
  }

  let engine = new Engine(); // outer
  let car = new Car(engine);
}

// inheritance, inclusion
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

  class MontainBike extends Bicycle {
    flashlight: Flashlight;

    constructor(public numberOfWheel: number, public hasBackSaddle: boolean) {
      super(numberOfWheel);

      this.flashlight = new Flashlight(90); // inclusion (composition)
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
  let mountainBike = new MontainBike(numberOfWheel, hasBackSaddle);

  mountainBike.getHasBackSaddle; // true;
  mountainBike.getNumberOfWheel; // 2
}
