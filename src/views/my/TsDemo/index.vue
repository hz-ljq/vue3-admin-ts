<template>
  <div class="TsDemo">
    <h2>TsDemo（初级）：基础部分</h2>
  </div>
</template>

<script setup lang="ts">
// 原则：
// 1，尽量不用any；
// 2，类型不确定的时候，尽量用unknown；

// ------------------------------------------------------------number、string、boolean、字面量
let a = 10
a = 11
a = 'kfdl'

// ------------------------------------------------------------any
// any类型变量，可以直接赋值给其他任意类型变量；
let f: any
f = 'any'

let g: string
g = f

// ------------------------------------------------------------unknown
// unknown类型变量，不可以直接赋值给其他任意类型变量，以下两种情况除外；
let h: unknown
h = 'unknown'
g = h

// 做了类型判断后，可以打破上面的规则；
if (typeof h === 'string') {
  g = h
}

// 类型断言，也可以打破上面的规则；（由于h是unknown类型，于是编译器认为h的类型是不确定的。但我们通过断言，就好像人为的告诉编译器h一定是string类型，那么编译器就不再追究了）
g = h as string // 写法一
g = <string>h // 写法二

// ------------------------------------------------------------object、{}
// object类型，很少用，因为范围太广。array、function、undefined、null都属于对象；
let i: object = []
// 因此，我们这么用
let j: { name: string } // :{}和:object的作用一样，但:{}可以去约定属性（包括属性名称、数量、类型）
j = { name: '孙悟空', age: 23 }
j = { name: '孙悟空' }

// 如果对象的属性存在状态不确定，可以通过?来表示可选属性
let k: { name: string; age?: number }
k = { name: '孙悟空', age: 23 }
k = { name: '孙悟空' }

// [propName: string]代表，任意string类型的属性名（其实，这在js中，就是个废话）。propName可以随意，比如：[xxx: string]
let l: { name: string; [propName: string]: any } // 约定l是一个对象，并且至少有一个叫name的属性，其值是string类型的；而其他属性名随意、属性值any类型、属性的数量随意。
l = { name: '孙悟空', age: 23, sex: 'male' }
l = { name: '孙悟空' }

// ------------------------------------------------------------函数
let n: number[]
n = [1, 2, '3']
n = [1, 2, 3]

let o: Array<number>
o = [1, 2, '3']
o = [1, 2, 3]

// -----------------------
function fn1(a: number, b: number, c?: number): number {
  return a + b + c
}
let c = fn1(1, 2)
let cc = fn1(1, 2, 3)

// void和never类型，用于函数的返回值；
// void代表，只能返回空值，undefined、null都行，不返回任何东西也行。
function fn2(): void {
  return null
}

// never代表，什么都不能返回，只能用于抛出异常。一般很少用；
function fn3(): never {
  throw Error('报错了')
}

// -----------------------
let m: (a: number, b: number) => number
m = function (n1: number, n2: number): number {
  return n1 + n2
}

m = (n1: number, n2: number): number => {
  return n1 + n2
}

m = (n1: string, n2: number): number => {
  return n1 + n2
}

// ------------------------------------------------------------ts新增的类型：tuple（叫做元组，就是固定长度的数组）
let p: [number, string]
p = [123, '3', 1]
p = [123, '3']

// ------------------------------------------------------------ts新增的类型：enum（叫做枚举，没太搞明白，感觉很鸡肋）

// ------------------------------------------------------------|代表：或。&代表：且
// -----------------------|代表：或
let d: 'male' | 'female'
d = 'male'

let e: number | boolean
e = false
// -----------------------&代表：且
let q: { name: string } & { age: number }
q = { name: '猪八戒' }
q = { name: '猪八戒', age: 13 }

// ------------------------------------------------------------type代表：类型别名
type myType = 1 | 2 | 3 | 4;
let r: myType;
r = 5;
r = 1;

// -----------------------------------------------------------泛型：
// 1，当我们不知道在调用时，会有什么类型的话，这时可以使用泛型【T】来表示未来可能类型；
// 2，然后在调用方法的时候，主动去指定类型来取代【T】；不指定也许，ts会进行类型推断的；
function fanxing<T>(a: T, b: number): T[] {
  let arr: T[] = []; // 或写成：let arr: Array<T> = [];
  for (let i = 0; i < b; i++) {
    arr.push(a);
  }
  return arr;
}
let param = 123;
fanxing<number>(param, 3);
fanxing(param, 3);
fanxing<string>(param, 3); // error

// -----------------------------------------------------------类型断言（通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。）
// 方式一: <类型>值
// 方式二: 值 as 类型  tsx中只能用这种方式
// 定义一个函数，得到一个 字符串或者数字 的数据长度
function getLength(x: number | string): number {
  if ((x as string).length) {
    // 或写成：if ((<string>x).length) {
    return (x as string).length;
  } else {
    return x.toString().length;
  }

  // return (x as string).length;
}
console.log(getLength("abcd"), getLength(1234));

// -----------------------------------------------------------类型推断
// 1. 定义变量时赋值了, 推断为对应的类型。
// 2. 定义变量时没有赋值, 推断为any类型。
/* 定义变量时赋值了, 推断为对应的类型 */
let b9 = 123; // number
b9 = "abc"; // error

/* 定义变量时没有赋值, 推断为any类型 */
let b10; // any类型
b10 = 123;
b10 = "abc";

// -----------------------------------------------------------接口interface
// 针对对象
interface IPerson {
  readonly id: number;
  name: string;
  age: number;
  sex?: string;
  play(): void;
}
const person2: IPerson = {
  id: 2,
  name: "tom",
  age: 20,
  // sex: '男' // 可以没有
  // xxx: 12 // error 没有在接口中定义, 不能有
};
person2.id = 2; // error

// 针对方法
interface SearchFunc {
  (a: string, b: string): boolean;
}
// 方法也可以这样申明：【let mySearch: (a: string, b: string) => boolean;】
// 方法还可以这样申明：【let mySearch = (src: string, sub: string):boolean => { return src.search(sub) > -1};】
let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
console.log(mySearch("abcd", "bc"));

// 针对类
interface Alarm {
  alert(): any;
}
interface Light {
  lightOn(): void;
  lightOff(): void;
}
class Car2 implements Alarm, Light {
  alert() {
    console.log("Car alert");
  }
  lightOn() {
    console.log("Car light on");
  }
  lightOff() {
    console.log("Car light off");
  }
}

// 接口继承接口
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// const断言，可以让引用数据类型的内部属性也不可变；
const abc = [1, 2, 3] as const; // 或者【const abc = <const>[1, 2, 3];】
abc.push(4);

</script>
