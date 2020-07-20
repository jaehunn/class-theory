// 1. super() / this
{
  class A {
    constructor(public a: string) {}

    private _a: string = "0G";

    set set_a(_a: string) {
      this._a = _a;
    }

    get get_a() {
      return this._a;
    }

    protected getA() {
      return this.a;
    }
  }

  class AA extends A {
    constructor(public a: string) {
      super(a);
    }

    getInfo() {
      console.log(
        super.getA(),
        super.a,

        this.getA(),
        this.a,

        (this.a = "1G"),
        super.getA(),
        super.a,

        this.getA(),
        this.a
      );
    }
  }
}
// 2. coupling: weak / strong

// 3. abstract / interface

// 4. overloading / overriding

// 5.singleton: eager / lazy

// 6. readonly / const
