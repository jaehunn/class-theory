"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. declaration and creation
{
    var Rectangle_1 = /** @class */ (function () {
        function Rectangle(x, y) {
            this.x = x;
            this.y = y;
        }
        Rectangle.prototype.getArea = function () {
            return this.x * this.y;
        };
        return Rectangle;
    }());
    // intantiate, assign Rectangle object(=new Rectangle) Object reference variable(=rectangle)
    var rectangle_1 = new Rectangle_1(1, 5);
    var area_1 = rectangle_1.getArea(); // access member method(=getArea)
    area_1; // 5
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
        var rectangle = new Rectangle_1(1, 5);
        var area = rectangle_1.getArea();
        area_1;
    }
}
// 2.inheritance and inclusion
{
    // typescript = single inheritance
    // (1) inheritance
    {
        var Animal = /** @class */ (function () {
            function Animal() {
            }
            return Animal;
        }()); // base class, super class
        // derived class, sub class
        var Horse = /** @class */ (function (_super) {
            __extends(Horse, _super);
            function Horse() {
                return _super.call(this) || this;
            }
            return Horse;
        }(Animal));
    }
    // (2) inclusion-composition
    {
        var Engine_1 = /** @class */ (function () {
            function Engine() {
            }
            return Engine;
        }());
        var Car = /** @class */ (function () {
            function Car() {
                this.engine = new Engine_1(); // strong relation, Car create/remove -> Engine create/remove
            }
            return Car;
        }());
        var myCar = new Car(); // create
        myCar = null; // remove
    }
    // (3) inclusion-aggregation
    {
        var Engine = /** @class */ (function () {
            function Engine() {
            }
            return Engine;
        }());
        var Car = /** @class */ (function () {
            function Car(engine) {
                this.engine = engine; // Weak relation
            }
            return Car;
        }());
        var engine = new Engine();
        var car = new Car(engine); // throw object
    }
    // (4) inheritance + inclusion
    {
        var Flashlight_1 = /** @class */ (function () {
            function Flashlight(lightIntensity) {
                this.lightIntensity = lightIntensity;
            }
            return Flashlight;
        }());
        var Bicycle = /** @class */ (function () {
            function Bicycle(numberOfWheel) {
                this.numberOfWheel = numberOfWheel;
            }
            Bicycle.prototype.getNumberOfWheel = function () {
                return this.numberOfWheel;
            };
            return Bicycle;
        }());
        // inheritance
        var MountainBike = /** @class */ (function (_super) {
            __extends(MountainBike, _super);
            function MountainBike(numberOfWheel, hasBackSaddle) {
                var _this = _super.call(this, numberOfWheel) || this;
                _this.numberOfWheel = numberOfWheel;
                _this.hasBackSaddle = hasBackSaddle;
                _this.flashlight = new Flashlight_1(90); // inclusion-composition
                return _this;
            }
            MountainBike.prototype.getHasBackSaddle = function () {
                return this.hasBackSaddle;
            };
            MountainBike.prototype.getNumberOfWheel = function () {
                return this.numberOfWheel;
            };
            return MountainBike;
        }(Bicycle));
        var hasBackSaddle = true;
        var numberOfWheel = 2;
        var mountainBike = new MountainBike(numberOfWheel, hasBackSaddle);
        mountainBike.getHasBackSaddle; // true
        mountainBike.getNumberOfWheel; /// 2
    }
}
// 3. access modifier
{
    // access range: public > protected > private
    // (1) public
    {
        var Base = /** @class */ (function () {
            function Base() {
                this.defaultAge = 0;
            }
            return Base;
        }());
        var Member = /** @class */ (function (_super) {
            __extends(Member, _super);
            function Member() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = 0;
                return _this;
            }
            Member.prototype.getAge = function () {
                return this.age + this.defaultAge; // age access (inner), defaultAge access (child)
            };
            return Member;
        }(Base));
        var member = new Member();
        member.getAge(); // access (outer)
    }
    // (2) private
    {
        var Base = /** @class */ (function () {
            function Base() {
                this.birthTYear = 2017;
            }
            return Base;
        }());
        var Member = /** @class */ (function (_super) {
            __extends(Member, _super);
            function Member() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = 0;
                return _this;
            }
            Member.prototype.getBirthYear = function () {
                return this.birthYear; // can't access
            };
            Member.prototype.getAge = function () {
                return this.age; // access (inner)
            };
            return Member;
        }(Base));
        var member = new Member();
        member.age; // can't access
        member.getAge(); // can't access
    }
    // (3) protected
    {
        var Base = /** @class */ (function () {
            function Base() {
                this.birthYear = "2017";
            }
            return Base;
        }());
        var Member = /** @class */ (function (_super) {
            __extends(Member, _super);
            function Member() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Member.prototype.getBirthYear = function () {
                return this.birthYear; // access (child)
            };
            return Member;
        }(Base));
        var member = new Member();
        member.getBirthYear(); // can't access
    }
    // (4) super, this
    {
        var PC = /** @class */ (function () {
            function PC(hddCapacity) {
                this.hddCapacity = hddCapacity;
                this.ram = "0G";
            }
            Object.defineProperty(PC.prototype, "ramCapacity", {
                get: function () {
                    return this.ram;
                },
                set: function (value) {
                    this.ram = value;
                },
                enumerable: false,
                configurable: true
            });
            PC.prototype.getHddCapacity = function () {
                return this.hddCapacity;
            };
            return PC;
        }());
        var Desktop = /** @class */ (function (_super) {
            __extends(Desktop, _super);
            function Desktop(hddCapacity) {
                var _this = _super.call(this, hddCapacity) || this;
                _this.hddCapacity = hddCapacity;
                return _this;
            }
            Desktop.prototype.getInfo = function () {
                _super.prototype.getHddCapacity; // 1G, parent method
                _super.prototype.hddCapacity; // undefined, can't get parent member directly (use memthod or getter)
                this.getHddCapacity(); // 1G, current class hddCapacity
                this.hddCapacity; // 1G, current class hddCapacity
                this.hddCapacity = "2G"; // current class member access
                _super.prototype.getHddCapacity.call(this); // 2G
                _super.prototype.hddCapacity; // undefined, can't access directly
                this.getHddCapacity(); // 2G
                this.hddCapacity; // 2G
                _super.prototype.ramCapacity = "16G"; // parent class setter access
                this.ramCapacity; // 16G, current member
                _super.prototype.ramCapacity; // 16G, getter access
                this.ramCapacity = "8G"; // current setter call
                this.ramCapacity; // 8G,
                _super.prototype.ramCapacity; // 8G, getter access
            };
            return Desktop;
        }(PC));
    }
    // (5) default (public, but use constructor parameter then access in constructor)
    {
        var Account = /** @class */ (function () {
            function Account(defaultBalance, // only use in constructor
            bankName, // access modifier -> member
            interestRate // access modifier -> member
            ) {
                if (defaultBalance === void 0) { defaultBalance = 1000; }
                if (bankName === void 0) { bankName = "happy bank"; }
                if (interestRate === void 0) { interestRate = 0.3; }
                this.bankName = bankName;
                this.interestRate = interestRate;
                this.balance = defaultBalance;
            }
            Object.defineProperty(Account.prototype, "getBalance", {
                get: function () {
                    return this.balance;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Account.prototype, "setBalance", {
                set: function (amount) {
                    this.balance += amount;
                },
                enumerable: false,
                configurable: true
            });
            Account.prototype.deposit = function (depositeAmount) {
                this.setBalance = depositeAmount;
            };
            Account.prototype.getInterestRate = function () {
                return this.interestRate; // read
            };
            Account.prototype.getDefaultBalance = function () {
                return this.defaultBalance; // can't access
            };
            return Account;
        }());
        var MyAccount = /** @class */ (function (_super) {
            __extends(MyAccount, _super);
            function MyAccount() {
                var _this = _super.call(this) || this;
                _this.deposit(1000);
                _this.setBalance = 1000;
                _this.balance; // 2000
                _this.getBalance; // 2000
                _this.interestRate; // 0.1
                _this.getInterestRate; // 0.1
                _this.bankName; // happy bank
                return _this;
            }
            return MyAccount;
        }(Account));
        var account = new Account();
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
    var AbstractBird = /** @class */ (function () {
        function AbstractBird() {
        }
        // implementation method
        AbstractBird.prototype.fly = function () {
            this.flySound("Fly Fly");
        };
        AbstractBird.prototype.getHabitat = function () {
            this.birdName;
            this.habitat;
        };
        return AbstractBird;
    }());
    var WildGoose = /** @class */ (function (_super) {
        __extends(WildGoose, _super);
        function WildGoose(birdName, habitat) {
            var _this = _super.call(this) || this;
            _this.birdName = birdName;
            _this.habitat = habitat;
            return _this;
        }
        WildGoose.prototype.flySound = function (sound) {
            this.birdName;
            sound;
        };
        return WildGoose;
    }(AbstractBird));
    var wildGoose = new WildGoose("A", "AP");
    wildGoose.fly(); // A Fly Fly
    wildGoose.getHabitat(); // A AP
}
// 5. interface
{
    // abstract has declaration and implementation, but interface only has declaration
    // (1) extends -> expand interface (enable multi inheritance)
    {
        var myCar = {}; // assertion
        myCar.speed = 100;
        myCar.acceleration = 100;
        myCar.waterproof = true;
    }
    // (2) same name method -> all re-implementation
    {
        // implementation Class, all implements
        var NewAnimal = /** @class */ (function () {
            function NewAnimal() {
            }
            NewAnimal.prototype.run = function () { };
            NewAnimal.prototype.fly = function () { };
            NewAnimal.prototype.getStatus = function () {
                return { runningSpeed: 10, flightSpeed: 20 };
            };
            return NewAnimal;
        }());
    }
    // interface -> fix object structure, after complie, removed
    // (3) object consistency
    {
        // 1. literal
        var person1; // [], elements object
        var person2 = void 0;
        // 3. class
        var Person3 = /** @class */ (function () {
            function Person3(name, city) {
                this.name = name;
                this.city = city;
            }
            return Person3;
        }());
        var person3 = [
            new Person3("A", "seoul"),
            new Person3("B", "sydney"),
            new Person3("C", "seatle"),
        ];
        var person4 = void 0;
        var person5 = [
            { name: "A", city: "seoul" },
            { name: "B", city: "sydney" },
            { name: "C", city: "seatle" },
        ];
    }
    // (4) function consistency
    {
        // parameter name differ
        var format = function (str, isUpper) {
            if (isUpper)
                return str.toUpperCase();
            else
                return str.toLowerCase();
        };
    }
}
// 6. overriding
{
    // parent class: overridden class
    // child class: overriding class (parent method re-declare)
    // (1) overriding 
    {
        // parent class
        var Bird = /** @class */ (function () {
            function Bird() {
            }
            Bird.prototype.flight = function (kmDistance) {
                if (kmDistance === void 0) { kmDistance = 0; }
                // ...
            };
            return Bird;
        }());
        // child class
        var Eagle = /** @class */ (function (_super) {
            __extends(Eagle, _super);
            function Eagle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // ...
            // overriding
            // 1. *method name same
            // 2. parameter name change
            // 3. *parameter type same, or sub-type (exception "any" type)
            // 4. *parameter type count, overriden >= overriding
            Eagle.prototype.flight = function (kmDistance2) {
                // ...
            };
            return Eagle;
        }(Bird));
    }
    // (2) overriding parameter type
    {
        // case 1
        flight(kmDistance, any = 0); // overriden
        flight(kmDistance, number = 0); // overriding, any > number
        // case 2
        flight(kmDistance, number = 0); // overriden
        flight(kmDistance, any = 0); // overriding, any type enable
    }
    // (3) parameter count
    {
        flight(kmDistance, number = 0, kmSpeed, number = 0); // overriden
        flight(kmDistance, number = 0); // overriding, less than overriden method parameter count
    }
    // overloading
    // 1. method name same
    // 2. parameter type, count differ
    // (4) overriding method -> overloading
    {
        var SingleTypeChecker = /** @class */ (function () {
            function SingleTypeChecker() {
                // ... 
            }
            SingleTypeChecker.prototype.typeCheck = function (value) {
                typeof value;
                value;
            };
            return SingleTypeChecker;
        }());
        var UnionTypeChecker = /** @class */ (function (_super) {
            __extends(UnionTypeChecker, _super);
            function UnionTypeChecker() {
                return _super.call(this) || this;
            }
            UnionTypeChecker.prototype.typeCheck = function (value) {
                // type guard
                if (typeof value === 'number')
                    value;
                else if (typeof value === 'string')
                    value;
                else
                    value;
            };
            return UnionTypeChecker;
        }(SingleTypeChecker));
        var unionTypeChecker = new UnionTypeChecker();
        unionTypeChecker.typeCheck(123); // 123
        unionTypeChecker.typeCheck('happy'); // happy
        unionTypeChecker.typeCheck(true); // error
        // overload -> union type
        typeCheck(value, number | string);
        void {
        // ...
        };
    }
    // (5) interface implementation -> overloading
    {
        var Point = /** @class */ (function () {
            function Point() {
            }
            // parameter x is selection parameter
            // parameter is union type
            Point.prototype.getX = function (x) {
                // type guard
                if (typeof x === 'number')
                    return x;
                else if (typeof x === 'string')
                    return x;
            };
            return Point;
        }());
    }
}
// 7. polymorphism
{
    // polymorphism
    // (1) class polymorphism
    {
        var Planet = /** @class */ (function () {
            function Planet() {
                this.isTransduction = true;
            }
            Planet.prototype.getIsTransduction = function () {
                return this.isTransduction;
            };
            Planet.prototype.stopTransduction = function () {
                this.isTransduction = false;
            };
            return Planet;
        }());
        var Earth = /** @class */ (function (_super) {
            __extends(Earth, _super);
            function Earth() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.features = ['soil', 'water', 'oxyzen'];
                return _this;
            }
            Earth.prototype.stopTransduction = function () {
                this.isTransduction = false;
            };
            return Earth;
        }(Planet));
        // parent(Planet) -> variable type, enable to assign child object(new Earth) 
        // parent method aceess, can't access child(Earch) features
        // overriding method call as fast as overriden method -> runtime polymorphism
        var earth = new Earth(); // 
        earth.diameter = 12656.2;
        earth.diameter; // 12656.2
        earth.getIsTransduction(); // true
        earth.stopTransduction();
        earth.getIsTransduction(); // false
    }
    // (2) abstract class polymorphism
    {
        var Train = /** @class */ (function () {
            function Train(speed) {
                this.speed = speed;
            }
            // implementation method
            Train.prototype.speedUp = function () {
                this.speed++;
            };
            return Train;
        }());
        var Ktx = /** @class */ (function (_super) {
            __extends(Ktx, _super);
            function Ktx(speed) {
                var _this = _super.call(this, speed) || this;
                _this.speed = speed;
                return _this;
            }
            // override
            Ktx.prototype.getSpeed = function () {
                return this.speed;
            };
            Ktx.prototype.speedUpUp = function () {
                this.speed += 2;
            };
            return Ktx;
        }(Train));
        // to Train, upcasting -> polymorphism
        // can't access Ktx class member(speedUpUp)
        var ktx = new Ktx(300);
        ktx.getSpeed(); // 300
        ktx.speedUp();
        ktx.getSpeed(); // 301
    }
    // (3) interface polymorphism
    {
        var PoliceOfficer = /** @class */ (function () {
            function PoliceOfficer() {
            }
            PoliceOfficer.prototype.getAge = function () {
                return 10;
            };
            PoliceOfficer.prototype.hasClub = function () {
                return true;
            };
            return PoliceOfficer;
        }());
        // enable to access base on Interface
        var policeMan = new PoliceOfficer();
        // implementation
        policeMan.getAlias();
        policeMan.getAge();
        policeMan.hasClub(); // cannot access
    }
    // (4) parameter polymorphism
    {
        var MonitorDisplayTest = /** @class */ (function () {
            function MonitorDisplayTest() {
            }
            // ... 
            // variant type -> type guard
            // union type -> polymorphism
            MonitorDisplayTest.prototype.display = function (data) {
                if (typeof data === 'string') {
                    return 'string' + data;
                }
                else {
                    return "number" + data;
                }
            };
            return MonitorDisplayTest;
        }());
        var displayTest = new MonitorDisplayTest();
        displayTest.display('happy'); // string happy
        displayTest.display(123); // number 123
        // class type
        var MonitorDisplayTest2 = /** @class */ (function () {
            function MonitorDisplayTest2() {
            }
            MonitorDisplayTest2.prototype.display1 = function (monitor) {
                if (monitor instanceof Led_1) {
                    // type aseertion -> enable to omit
                    var myMonitor = monitor;
                    return myMonitor.getName();
                }
                else if (monitor instanceof Oled_1) {
                    // type aseertion -> enable to omit
                    var myMonitor = monitor;
                    return myMonitor.getName();
                }
            };
            return MonitorDisplayTest2;
        }());
        displayTest.display(new Led_1('LED'));
        displayTest.display(new Oled_1('OLED'));
        // type compatible
        var Led_1 = /** @class */ (function () {
            function Led(name) {
                this.name = name;
            }
            Led.prototype.getName = function () {
                return this.name;
            };
            return Led;
        }());
        // type compatible
        var Oled_1 = /** @class */ (function () {
            function Oled(name) {
                this.name = name;
            }
            Oled.prototype.getName = function () {
                return this.name;
            };
            return Oled;
        }());
        var MonitorDisplayTest3 = /** @class */ (function () {
            function MonitorDisplayTest3() {
            }
            // ...
            // do not need to union type and instance guard
            MonitorDisplayTest3.prototype.display = function (monitor) {
                var myMonitor = monitor;
                return myMonitor.getName();
            };
            return MonitorDisplayTest3;
        }());
    }
}
// 9. getter / setter
{
    // getter: accessor
    // setter: mutator
    // (1) getter/setter
    {
        var obj = {
            myName: '',
            set name(name) {
                this.myname = name;
            },
            get name() {
                return this.myName;
            },
        };
        var Student = /** @class */ (function () {
            function Student() {
            }
            return Student;
        }());
        var student = new Student;
        // setter
        student.name = 'happy';
        student.birthYear = 2017;
        student.name; // happy
        student.birthYear; // 2017
        // add logic
        var Student2_1 = /** @class */ (function () {
            function Student2() {
            }
            Object.defineProperty(Student2.prototype, "name", {
                get: function () {
                    return this.studentName;
                },
                set: function (name) {
                    // ~x = -(x + 1)
                    // x = -1, false
                    // x != -1, true
                    if (!~name.indexOf('happy')) {
                        this.studentName = name;
                    }
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Student2.prototype, "birthYear", {
                get: function () {
                    return this.studentBirthYear;
                },
                set: function (year) {
                    if (year <= 2000)
                        this.studentBirthYear = year;
                },
                enumerable: false,
                configurable: true
            });
            return Student2;
        }());
        var student2 = new Student2_1();
        student2.birthYear = 2001; // set, do not assignment
        student2.birthYear; // get, undefined (private)
        student2.birthYear = 2000; // set, assignment
        student2.birthYear; // get, 2000 (private)
        student2.name = 'happy'; // set, do not assignment
        student2.name; // get, undefined (private)
        student2.name = 'lucky'; // set, assignment
        student2.name; // get, lucky (private)
    }
    // (2) compile, javascript
    {
        var Student2 = (function () {
            function Student2() { }
            Object.defineProperty(Student2.prototype, "name", {
                get: function () {
                    return this.studentName;
                },
                set: function (name) {
                    if (!~name.indexOf("happy")) {
                        this.studentName = name;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Student2.prototype, "birthYear", {
                get: function () {
                    return this.studentBirthYear;
                },
                set: function (year) {
                    if (year <= 2000)
                        this.studentBirthYear = year;
                },
                enumerable: true,
                configurable: true
            });
            return Student2;
        })();
    }
}
// 9. static
{
    // access without create instance, memory saving
    // (1) share object, class
    {
        var Circle_1 = /** @class */ (function () {
            function Circle() {
            }
            Circle.getArea = function (radius) {
                this.circleArea = radius * radius * Circle.pi;
                return this.circleArea;
            };
            Object.defineProperty(Circle_1, "area", {
                set: function (pArea) {
                    Circle.circleArea = pArea;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Circle.prototype, "area", {
                get: function () {
                    return Circle.circleArea;
                },
                enumerable: false,
                configurable: true
            });
            Circle.pi = 3.14;
            Circle.circleArea = 0;
            return Circle;
        }());
        Circle_1.getArea(3); // 28.26
        Circle_1.area = 100; // setter
        var circle = new Circle_1();
        circle.area; // 100, share (object, class)
    }
    // singleton pattern, share only one object
    // (2) singleton - eager initialization: initialize when program working, get to object using static method
    {
        var EagerLogger = /** @class */ (function () {
            function EagerLogger() {
            }
            EagerLogger.prototype.EagerLogger = function () { }; // prevent to create object
            EagerLogger.getLogger = function () {
                return this.uniqueObject;
            };
            EagerLogger.prototype.info = function (message) {
                message;
            };
            EagerLogger.prototype.warning = function (message) {
                message;
            };
            EagerLogger.uniqueObject = new EagerLogger(); // initialization
            return EagerLogger;
        }());
        // can't enable to use new keyword
        var eagerLogger = EagerLogger.getLogger();
        var eagerLogger2 = EagerLogger.getLogger();
        eagerLogger.info('A'); // A
        eagerLogger.warning('B'); // B
        eagerLogger.info("" + (eagerLogger === eagerLogger2)); // true
    }
    // (3) singleton - lazy initialization, add to exist validation
    {
        var LazeLogger_1 = /** @class */ (function () {
            function LazeLogger() {
            }
            LazeLogger.prototype.LazeLogge = function () { };
            LazeLogger.getLogger = function () {
                if (this.uniqueObject == null) {
                    this.uniqueObject = new LazeLogger(); // if empty, init
                }
                return this.uniqueObject; // exist, return
            };
            LazeLogger.prototype.info = function (message) {
                message;
            };
            LazeLogger.prototype.warning = function (message) {
                message;
            };
            return LazeLogger;
        }());
        var lazeLogger = LazeLogger_1.getLogger();
        var lazeLogger2 = LazeLogger_1.getLogger();
        lazeLogger.info('A'); // A
        lazeLogger.info('A'); // A
        lazeLogger.info("" + (lazeLogger === lazeLogger2)); // true
    }
}
// 10. readonly modifier
{
    // do not same const keyword
    // (1) readonly can use interface, class member
    {
        var TestReadonly = /** @class */ (function () {
            function TestReadonly() {
            }
            return TestReadonly;
        }());
    }
    // (2) can use keyword when declare literal object properties 
    {
        var TestReadonly = /** @class */ (function () {
            function TestReadonly() {
                this.count4 = 0;
                this.count5 = 0; // can't declare in method
            }
            TestReadonly.prototype.getCount = function () {
                this.count4 = 0;
            }; // can't re-assign
            return TestReadonly;
        }());
    }
    function getCount() {
        count: number; // can't declare in function
    }
    var literalObj = { alias: 'happy' }; // enable
    literalObj.name = 'happy'; // can't assign
    literalObj = 'test'; // can't assign
    // readonly do not force to initialize, but initialize so can't re-assign
}
// (3) for remove readonly, do type aliasing
{
    var emotion = { name: 'sad' }; // value fixed, readonly
    // remove readonly 
    function aliasing(pEmotion) {
        pEmotion.name = 'happy'; // re-assign
    }
    emotion.name; // sad
    aliasing(emotion);
    emotion.name; // happy
}
