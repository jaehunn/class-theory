// public
{
  class Base {
    public defaultAge = 0;
  }
  class Member extends Base {
    age = 0;

    public getAge() {
      return this.age + this.defaultAge;
    }
  }

  let member = new Member();
  member.getAge();
}

// private
{
  class Base {
    private birthYear = 2017;
  }

  class Member extends Base {
    private age = 0;

    private getBirthYear() {
      return this.birthYear;
    }

    private getAge() {
      return this.age;
    }
  }

  let member = new Member();
  member.age;
  member.getAge();
}

// protected
{
  class Base {
    protected birthYear = 2017;
  }

  class Member extends Base {
    protected getBirthYear() {
      return this.birthYear;
    }
  }

  let member = new Member();

  member.getBirthYear();
}

// super, this
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
      super.getHddCapacity(); // 1G
      super.hddCapacity; // undefined

      this.getHddCapacity(); // 1G
      this.hddCapacity; // 1G

      this.hddCapacity = "2G";
      super.getHddCapacity(); // 2G
      super.hddCapacity; // undefined

      this.getHddCapacity(); // 2G
      this.getHddCapacity(); // 2G

      super.ramCapacity = "16G";
      this.ramCapacity; // 16G
      super.ramCapacity; // 16G

      this.ramCapacity = "8G";
      this.ramCapacity; // 8G
      super.ramCapacity; // 8G
    }
  }

  let myDesktop = new Desktop("1G");
  myDesktop.getInfo();
}

// default (= public)
{
  class Account {
    public balance: number;

    public get getBalance() {
      return this.balance;
    }

    public set setBalance(amount: number) {
      this.balance += amount;
    }

    deposit(depositAmount: number) {
      this.setBalance = depositAmount;
    }

    constructor(
      defaultBalance: number = 1000,
      protected bankName: string = "happy bank",
      readonly interestRate: number = 0.1
    ) {
      this.balance = defaultBalance;
    }

    public getInterestRate() {
      return this.interestRate;
    }

    public getDefaultBalance() {
      // return this.defaultBalance; => Cannot Access
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
      this.getInterestRate(); // 0.1
      this.bankName; // happy bank
    }
  }

  let account = new Account();

  account.balance; // 0
  account.getBalance; // 0
  account.interestRate; // 0.1
  account.getInterestRate(); // 0.1

  let myAccount = new MyAccount();
}
