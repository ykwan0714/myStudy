# React에서 사용하는 ECMAScript6 (ES6) 문법
## 1. Block scoped variables

ES6에서 새로 등장한 변수 형태는 `let`과 `const`이다.
`let`은 기존의 `var`를 대체하는 block varibale 이고, `const`는 상수로써 한번 선언이 되면 값을 변경 할 수 없다.
이들 두 변수는 block scope 내부에서만 존재하며, 임시사각지대인 `TDZ`가 존재한다.

> **TDZ (Temporal Dead Zone)**
> 임시사각지대, block scope 내에서는 지역변수/상수에 대한 hoisting이 이뤄지기는 하나, 선언된 위치 이전까지는 해당 변수/상수를 인식하지 못한다.
> 즉, hoisting은 하지만 `var` 처럼 `undefined`로 값을 초기화 시키지는 않는다.

```javacscript
{
  let a = 10;
  console.log(a);    // (1)
  {
    console.log(a);	 // (2)
    let a = 20;
  }
}
```

위의 예제는 (2)에서 error가 발생 한다. block scope 내부에서 hoisting은 일어나지만,
undeinfed로 초기화 해 주지 않는 임시사각지대이기 때문이다. 그런데 block scope 내부에서 함수는 약간 동작이 이상하다.

```javascript
{
  foo();    // (1)
  function foo(){ console.log(1); }
  {
    foo();    // (2)
    function foo(){ console.log(2);}
  }
}
foo();    // (3)
```

block scope가 존재하는 듯 하면서도 아닌 것 처럼 동작한다. `use strict;` 사용해야 명확하게 block scope의 영향을 받게 된다.
때문에 함수는 함수표현식 대신 되도록 변수를 통해 할당하여 사용하도록 하자.


#### 변수별 스코프 종속성

variables \ scope    | function | block | hoisting | TDZ
:---:                | :---:    | :---: | :---:    | :---:
let                  | O        | O     |  O       | O
const                | O        | O     |  O       | O
var                  | O        | X     |  O       | X
function declaration | O        | △    |  O       | X

추가로 `const`는 상수라고 했지만 `const` 변수가 담고 있는 자료형이 기본형이 아닌 Object 경우 값 변환을 할 수 있다.
> 기본형 (Primitive values)
>
>  * Number
>  * String
>  * Boolean
>  * null
>  * undefined
>
> Object
>
>  * Array
>  * Date
>  * function
>  * Regex

아래와 같이 일반 자료형으로 `const`를 선언 시 변경이 불가능하다.

```javascript
const PI = 3.141593;
PI = 3.14;         // (1)
```

다만 아래와 같이 Object 형태로 선언하게 되면 변경이 된다.

```javascript
const a = {
	a: 1,
	b: 2
}
a = [ 1, 2, 3] ;    //error
a.a = 3;
console.log(a)		// (1)

const OBJ = {
  prop1 : 1,
  prop2 : {a: 1, b: 2}
};
OBJ.prop1 = 3;
OBJ.prop2.b = 3;
console.log(OBJ);    // (2)
```

이는 기본 자료형과 Object 자료형의 메모리 할당 방식의 차이 때문이다.
Shallow copy(얕은 복사)와 Deep copy(깊은 복사)도 이러한 차이 때문에 발생한다.


## 2. Block scope
기존 함수 scope 처럼 `{}`에 의해 scope가 생성 된다.

```javascript
{
  let a = 10;
  {
    let a = 20;
    console.log(a);    // (1)
  }
  console.log(a);      // (2)
}
console.log(a);        // (3)
```

다만 for/while문 같은 경우 `()` 부터 scope가 생성된다.

```javascript
let sum = 0;
for(let j = 1 ; j <= 10 ; j++){
  sum += j;
}
console.log(sum);     // (1)
console.log(j);       // (2)
```

## 3. Arrow function

순수 function 기능만을 담당하기 위해 간소화 된 function이다. `prototype`이 존재하지 않아 constructor를 사용할 수 없다.

```javascript
// 기존 function
var foo1 = function(a){
	return a * a;
}
// Arrow function
let foo2 = (a) => {
	return a * a;
}
var newFoo1 = new foo1(); // (1)
let newFoo2 = new foo2(); // (2)

```

Arrow function은 상황에 따라 좀 더 축약이 가능하다.

```javascript
let func1 = (a) => { return a * a; }
let func2 = a => a * a; 		// {}로 묶지 않으면 return 생략이 가능
let func3 = () => ({ a : 1 })	// 단 Object 반환을 하기 위해선 () 묶어줘야한다.

var counter1 = function(x){
		return function(){
			return x++;
		}
	}
let counter2 = (x) => () => x++;
const c1 = counter1(0);
const c2 = counter2(0);
console.log(c1());
console.log(c1());  // (1)
console.log(c2());
console.log(c2());  // (2)
```

또한 Arrow function은 `this`를 Binding 하지 않는다.

```javascript
// ES5
var obj = {
  grades: [80, 90, 100],
  getTotal: function() {
	var self = this; // forEach의 function에서 사용하기 위해 this 저장
    this.total = 0;
    this.grades.forEach(function(v){
      self.total += v;  // 위에서 저장한 self를 통해 this(obj)에 접근한다.
    });
  }
};
obj.getTotal();
console.log(obj.total);  // (1)

// ES6
let obj2 = {
  grades: [80, 90, 100],
  getTotal: function() {
    this.total = 0;
    this.grades.forEach(v => {
      this.total += v; //this 접근 가능
    });
  }
};
obj2.getTotal();
console.log(obj2.total);  // (2)
```

## 5. Spread operator

Spread Operator(...)는 크게 3가지 용도가 있다.

### 5-1. function의 Rest parmeter

parameter를 일정하지 않은 값들을 넘기고자 할 경우에 사용한다. 기존의 arguments의 대체로써 비슷해 보이지만 엄연히 다르다.
arguments는 Object이고, Rest Parameter는 Array이다.

```javascript
let foo = (x, y, ...rest) => {
  console.log(rest);        // (1)
}
foo(1, 2, true, null, undefined, 10);
```

### 5-2. Destructuring

Array는 배열의 각 요소로, String은 각 단어로 해체하여 여러개의 값으로 반환해준다.

```javascript
const arr = [20, 10, 30, 40, 50];
const str = 'lorem ipsum';
console.log(...arr);       // (1)
console.log(...str);     // (2)

const [a, b, ...iterableObj] = [1, 2, 3, 4, 5];
console.log(a, b, iterableObj);  // (3)

```

이러한 특성을 이용하면 Array의 얕은 복사도 가능하다.

```javascript
const orgArr = [1, 2];
const copiedArr = [...orgArr];

orgArr.push(3);
console.log(orgArr);   // (1)
console.log(copiedArr); // (2)
```

### 5-3. Array push

배열 중간에 push도 가능해진다.

```
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // (1)
```

## 6. Default parameter

파라미터에 값을 할당하지 않는 경우 지정된 기본 값으로 파라미터를 할당해 준다.
각 파라미터도 역시 TDZ가 존재한다.

```javascript
function f(i = 0, x = 1, y = 2, z = 3){
  console.log(i, x, y, z);     //(1)
}
f(4, null, undefined, 5);

function multiply(x = y * 3, y){
  console.log(x * y);
}
multiply(2, 3);             // (1)
multiply(undefined, 2);     // (2) TDZ 발생!
```

여기서 null은 falsy한 값이지만 존재하는 값이다. (typeof null === 'object')
> *Falsy*
>
> * 0
> * null
> * undefined  // default parameter로 전달하면 적용된다.
> * '' / ""
> * false
> * NaN

## 7. 보다 강력해진 Object literal

###7-1. Property value shorthand

Object의 key와 value가 동일한 경우, key를 생략할 수 있다.

```javascript
function getCar(make, model, value) {
	return {
		make,   // make : make
		model,  // model : model
		value   // value : value
	};
}
console.log(getCar('Hyundai', 'Sonata', 3000)) // (1)
```

###7-2. Computed property keys

Object의 key 값에 표현식을 지정할 수 있다.

```javascript
function getCar(make, model, value) {
	return {
		['make ' + make]: true
	};
}
console.log(getCar('Hyundai')); // (1)
```

###7-3. Method definition shorthand

Method 명 뒤에 `funcion :` 키워드를 생략할 수 있다. prototype은 존재하지 않는다.

```javascript
function getCar(make, model, value) {
	return {
		depreciate() {   // depreciate : function이 생략되었다.
			this.value -= 2500;
		}
	};
}
console.log(getCar('Hyundai', 'Sonata', 3000)) // (1)
```

###7-4. Obejct.assign

[Object.assign()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 사용하면 Object의 얕은 복사를 수행한다.

```javascript
const orgObj = {
  a: [2, 3, 4],
  b: { d: 5, e: 6 }
};
const copiedObj = Object.assign({}, orgObj, { b: { f: 7, g: 8 } });
console.log(copiedObj);   // (1)
```

###8. Destructuring Assignment

Array 또는 Object의 데이터를 별개의 변수로 추출해 준다.

```javascript
// Array to distinct value
[a, b] = [1, 2];
console.log(a , b); // (1)

//Object to distnct value
({c, d} = {a:1, b:2});
console.log(a, b); // (2)

const {
  age: a,
  gender,
  name
} = { name :’아이유’, age :23, gender : ‘female’}
console.log(a, gender, name);  // (3) 순서가 달라도 key 값으로 match

// 일부 값 무시하기
var [a, , b] = [1, 2, 3];
console.log(a, b); // (3)
```

###9. Template literals

큰따옴표(") 나, 작은 따옴표(') 대신 back-tick (`)을 이용하여 string을 감싼다.
먼저 줄 바꿈은 아래와 같이 표현할 수 있다.

```javascript
// ES6
console.log(`string text line 1
string text line 2`);

// ES5
console.log("string text line 1\n"+
"string text line 2");
```
중간에 값 삽입은 아래와 같이 표현할 수 있다.

```javascript
// ES6
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);

// ES5
var c = 5;
var d = 10;
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");
```

##10. Class

ES5에서 객체지향으로 구현하기 위해선 function을 생성자로 사용하여 매우 복잡 했지만, ES6에선 Class 키워드로 쉽게 구현할 수 있다.

```javascript
class Car {
  constructor(name){
    this.name = name;
    this.type = 'Car';
  }
  getName() {
    return this.name;
  }
}

let car = new Car('My Car');
console.log(car.getName());  // (1)

class SUV extends Car {
  constructor(name){
    suepr(name);
    this.type = 'SUV';
  }
}
let suv = new SUV('My Car');
console.log(suv.getName());  // (2)
```
