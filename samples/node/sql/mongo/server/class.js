class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speakChinese() {
        console.log('I can speak Chinese');
    }
}

class Child extends Parent {
    speakEnglish() {
        console.log('I can speak English');
    }
}

let XuShiLin = new Child('许士林', 12);
XuShiLin.speakChinese();
XuShiLin.speakEnglish();