class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(this.age + '岁的' + this.name + '在吃饭');
    }
    skill(_skill) {
        this.eat();
        console.log(this.name + '擅长' + _skill);
    }
    hobby(_hobby) {
        console.log(this.name + '喜欢' + _hobby);
    }
}

var XuShiLin = new Person('许仙', 20);
XuShiLin.skill('看病');
XuShiLin.hobby('蛇');
var XuShiLin = new Person('许士林', 12);
XuShiLin.skill('读书');
XuShiLin.hobby('兔子');