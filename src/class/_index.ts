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

  // (1) public
  {
    class Base {
      public defaultAge = 0;
    }

    class Member extends Base {
      age = 0;

      public getAge() {
        return this.age + this.defaultAge; // age access (inner), defaultAge access (child)
      }
    }

    let member = new Member();
    member.getAge(); // access (outer)
  }

  // (2) private
  {
    class Base {
      private birthTYear = 2017;
    }

    class Member extends Base {
      private age = 0;

      private getBirthYear() {
        return this.birthYear; // can't access
      }

      private getAge() {
        return this.age; // access (inner)
      }
    }

    let member = new Member();

    member.age; // can't access
    member.getAge(); // can't access
  }

  // (3) protected
  {
    class Base {
      protected birthYear = "2017";
    }

    class Member extends Base {
      protected getBirthYear() {
        return this.birthYear; // access (child)
      }
    }

    let member = new Member();

    member.getBirthYear(); // can't access
  }

  // (4) super, this
  {
    class PC {
      constructor(public hddCapacity: string) {}

      private ram: string = "0G";

      set ramCapacity(value: string) {
        this.ram = value;
      }

      get ramCapacity() {
        return this.ram;
      }

      protected getHddCapacity() {
        return this.hddCapacity;
      }
    }

    class Desktop extends PC {
      constructor(public hddCapacity: string) {
        super(hddCapacity);
      }

      getInfo() {
        super.getHddCapacity; // 1G, parent method
        super.hddCapacity; // undefined, can't get parent member directly (use memthod or getter)

        this.getHddCapacity(); // 1G, current class hddCapacity
        this.hddCapacity; // 1G, current class hddCapacity

        this.hddCapacity = "2G"; // current class member access
        super.getHddCapacity(); // 2G
        super.hddCapacity; // undefined, can't access directly

        this.getHddCapacity(); // 2G
        this.hddCapacity; // 2G

        super.ramCapacity = "16G"; // parent class setter access
        this.ramCapacity; // 16G, current member
        super.ramCapacity; // 16G, getter access

        this.ramCapacity = "8G"; // current setter call
        this.ramCapacity; // 8G,
        super.ramCapacity; // 8G, getter access
      }
    }
  }

  // (5) default (public, but use constructor parameter then access in constructor)
  {
    class Account {
      public balance: number;

      public get getBalance() {
        return this.balance;
      }

      public set setBalance(amount: number) {
        this.balance += amount;
      }

      deposit(depositeAmount: number) {
        this.setBalance = depositeAmount;
      }

      constructor(
        defaultBalance: number = 1000, // only use in constructor
        protected bankName: string = "happy bank", // access modifier -> member
        readonly interestRate: number = 0.3 // access modifier -> member
      ) {
        this.balance = defaultBalance;
      }

      public getInterestRate() {
        return this.interestRate; // read
      }

      public getDefaultBalance() {
        return this.defaultBalance; // can't access
      }
    }

    class MyAccount extends Account {
      constructor() {
        super();
        this.deposit(1000);
        this.setBalance = 1000;

        this.balance; // 2000
        this.getBalance; // 2000
        this.interestRate; // 0.1
        this.getInterestRate; // 0.1
        this.bankName; // happy bank
      }
    }

    let account = new Account();

    account.balance; // 0
    account.getBalance; // 0
    account.interestRate; // 0.1
    account.getInterestRate; // 0.1
    account.bankName; // protected
  }
}

// 4. abstract
{
  // abstract keyword cannot declare with static or access modifier
  // abstract implementation method = template method pattern
  abstract class AbstractBird {
    abstract birdName: string;
    abstract habitat: string;

    // abstract method
    abstract flySound(sound: string); // body nothing

    // implementation method
    fly(): void {
      this.flySound("Fly Fly");
    }

    getHabitat(): void {
      this.birdName;
      this.habitat;
    }
  }

  class WildGoose extends AbstractBird {
    constructor(public birdName: string, public habitat: string) {
      super(); // inheritance, abstract member
    }

    flySound(sound: string) {
      this.birdName;
      sound;
    }
  }

  let wildGoose = new WildGoose("A", "AP");

  wildGoose.fly(); // A Fly Fly
  wildGoose.getHabitat(); // A AP
}

// 5. interface
{
  // abstract has declaration and implementation, but interface only has declaration
  // (1) extends -> expand interface (enable multi inheritance)
  {
    interface Car {
      speed: number;
    }

    interface SportsCar {
      acceleration: number;
    }

    // multi inheritance
    interface MyOptimizedCar extends Car, SportsCar {
      waterproof: boolean;
    }

    let myCar = <MyOptimizedCar>{}; // assertion

    myCar.speed = 100;
    myCar.acceleration = 100;
    myCar.waterproof = true;
  }

  // (2) same name method -> all re-implementation
  {
    interface Dog {
      run(): void;
      getStatus(): { runnningSpeed: number };
    }

    interface Bird {
      fly(): void;
      getStatus(): { flightSpeed: number };
    }

    // DogBird is sub-type of Dog, Bird, method re-implementation
    interface DogBird extends Dog, Bird {
      getStatus(): { runningSpeed: number; flightSpeed: number };
    }

    // implementation Class, all implements
    class NewAnimal implements DogBird {
      run(): void {}
      fly(): void {}
      getStatus(): { runningSpeed: number; flightSpeed: number } {
        return { runningSpeed: 10, flightSpeed: 20 };
      }
    }
  }

  // interface -> fix object structure, after complie, removed

  // (3) object consistency
  {
    // 1. literal
    var person1: { name: string; city: string }[]; // [], elements object

    // 2. type alias
    type objectLiteralType = { name: string; city: string };

    let person2: objectLiteralType[];

    // 3. class
    class Person3 {
      constructor(public name: string, public city: string) {}
    }

    var person3: Person3[] = [
      new Person3("A", "seoul"),
      new Person3("B", "sydney"),
      new Person3("C", "seatle"),
    ];

    // 4. interface
    interface Person {
      name: string;
      city: string;
    }

    let person4: Person[];

    interface PersonItems extends Array<Person> {}
    let person5: PersonItems = [
      { name: "A", city: "seoul" },
      { name: "B", city: "sydney" },
      { name: "C", city: "seatle" },
    ];
  }

  // (4) function consistency
  {
    interface IFormat {
      (data: string, toUpper?: boolean): string; // function type
    }

    // parameter name differ
    let format: IFormat = function (str: string, isUpper: boolean): string {
      if (isUpper) return str.toUpperCase();
      else return str.toLowerCase();
    };
  }
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
