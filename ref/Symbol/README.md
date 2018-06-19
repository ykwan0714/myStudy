## Symbol

심벌은 새로운 원시 타입이고, 심벌 참조 없이 접근할 수 없는 열거 불가능 프로퍼티를 만드는데 사용된다. 심벌은 Bool의 true나 숫자의 42처럼 리터럴 형태가 없다.

> **자바스크립트의 원시 타입**   
> string, number, null, undefined, bool, symbol
 
### 사용하기

```js
let firstName = Symbol();
let person = {};
person[fistName] = "Tom";
console.log(person[firstName]); // "Tom"
```

프로퍼티를 할당할 때 심벌을 사용하면, 같은 프로퍼티에 접근하려 할 때마다 그 심벌을 사용해야한다.


Symbol 함수는 서술 문자열을 선택적 인자로 받을 수 있다. 서술 문자열은 프로퍼티에 접근하는 용도로 사용할 수 없지만, 심벌을 쉽게 읽고 디버깅할 수 있도록 항상 제공하는 것이 좋다. 또한 계산된 프로터피 (computed property) 이름을 사용하는 곳에는 모두 심벌을 사용할 수 있다.

```js
let firstName = Symbol("first name"); // 서술 문자열

// computed object literal property
let person = {
	[firstName]: "Tom"
};

// 프로퍼티를 읽기 전용으로 만듦
Object.defineProperty(person, firstName, { writable: false });

let lastName = Symbol("last name");

Object.defineProperties(person, {
	[lastName]: {
		value: "Cruise",
		writable: false
	}
});

console.log(person[firstName]); // "Tom"
console.log(person[lastName]); // "Cruise"
```



### 심벌 공유

**Symbol.for()**

```js
let uid = Symbol.for("uid");
let object = {};

object[uid] = "12345";

console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)";
```

Symbol.for() 메서드는 먼저 "uid"를 키로하는 심벌이 존재하는지 확인하기 위해 전역 심벌 저장소를 검색한다. 만약 심벌이 존재하면, 메서드는 그 심벌을 반환한다. 이후 같은 키를 사용하여 Symbol.for()를 호출하면 같은 심벌이 반환된다.

```js
let uid = Symbol.for("uid");
let object = {
	[uid]: "12345"
};

console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)";

let uid2 = Symbol.for("uid");

console.log(uid === uid2); // true
console.log(object[uid2]); // "12345"
console.log(uid); // "Symbol(uid)";
```

**Symbol.keyFor()**

Symbol.keyFor() 메서드를 호출하여 전역 심벌 저장소에서 심벌과 관련된 키를 탐색할 수 있다.

```js
let uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid)); // uid

let uid2 = Symbol.for("uid");
console.log(Symbol.keyFor(uid2)); // uid

let uid3 = Symbol("uid");
console.log(Symbol.keyFor(uid3)); // undefined
```

uid3는 전역 심벌 저장소에 존재하지 않으므로 undefined를 반환한다.

### 심벌 프로퍼티 탐색

**Object.getOwnPropertySymbols()**

Object.getOwnPropertySymbols()는 객체가 소유한 프로퍼티 심벌 배열을 반환한다.

```js
let uid = Symbol.for("uid");
let object = {
	[uid]: "12345"
};

let symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.lenght); // 1
console.log(symbols[0]); // "Symbol(uid)"
console.log(object[symbols[0]]); // "12345"
```

### well-known symbols

ES6에서는 예전에는 내부 전용 연산자로 여겨지던 공통 동작을 well-known symbols(상용 심벌)로 미리 정리 했다. 상용 심벌은 Symbol.match 처럼 Symbol 객체의 프로퍼티로 나타낸다.

**Symbol.hasInstance**

객체 상속을 확인하기 위해 instanceof에 의해 사용되는 메서드. 모든 함수는 주어진 객체가 그 함수의 인스턴슽인지를 확인하는 Symbol.hasInstance 메서드를 가진다. 모든 함수가 instanceof 프로퍼티를 위한 기본동작을 상속받는다. ES6에서는 기본적으로 instanceof 연산자가 이 메서드 호출의 단축 문법으로 재정의 되었다.

```js
obj instanceof Array;
// above and below same
Array[Symbol.hasInstance](obj)

```

**Symbol과 정규식**

* Symbol.match == match(regex): 주어진 문자열이 정규표현식에 매칭 되는지 검사
* Symbol.repalce == replace(regex, replacement): 정규표현식에 매칭되는 부분을 replacement로 대채 
* Symbol.search == search(regex): 문자열 내에서 정규표현식에 매칭되는 위치를 찾음
* Symbol.split == split(regex): 정규표현식에 매칭되는 부분으로 문자열을 나누고 배열로 만들어 반환  

```js
// 사실상 /^.{10}$/와 같다
let hasLengthOf10 = {
	[Symbol.match]: function(value) {
		return value.length === 10 ? [value] : null;
	},
	[Symbol.replace]: function(value, replacement) {
		return value.length === 10 ? replacement : value;
	},
	[Symbol.search]: function(value) {
		return value.length === 10 ? 0 : -1;
	},
	[Symbol.split]: function(value) {
		return value.length === 10 ? ["", ""] : [value];
	}
};

let message1 = "Hello World", // 11 chars
    message2 = "Hello John"; // 10 chars
    
let match1 = message1.match(hasLengthOf10),
    match2 = message2.match(hasLengthOf10);
    
console.log(match1); // null
console.log(match2); // "Hello John"

let replace1 = message1.replace(hasLengthOf10, "Howdy!"),
    replace2 = message2.replace(hasLengthOf10, "Howdy!");

console.log(replace1); // "Hello World"
console.log(replace2); // "Howdy!"

let search1 = message1.search(hasLengthOf10),
    search2 = message2.search(hasLengthOf10);

console.log(search1); // -1
console.log(search2); // 0

let split1 = message1.split(hasLengthOf10),
    split2 = message2.split(hasLengthOf10);

console.log(split1); // ["Hello World"]
console.log(split2); // ["", ""]w
```

**Symbol.isConcatSpreadable**

Symbol.isConcatSpreadable는 bool 값으로, 객체가 *length*와 *숫자 key*를 가졌는지 확인하고 concat() 호출 결과에 값을 추가할지 여부를 결정한다. 아래 예제 처럼 어떤 타입이든 concat() 호출 시 배열처럼 동작하도록 정의할 수 있다.

```js
let collection = {
	0: "Hello",
	1: "World",
	length: 2,
	[Symbol.isConcatSpreadable]: true
};

let messages = [ "Hi" ].concat(collection);

console.log(messages.length); // 3
console.log(messages); // ["Hi", "Hello", "World"];
```

> concat() 메서드는 배열이 아닌 인자도 받을 수 있다.


**Symbol.toPrimitive**

자바스크립트에서는 종종 연산이 적용될 때 암묵적으로 객체를 원시값으로 변환하려고 시도한다. ES6는 Symbol.toPrimitive 메서드를 통해 변환을 시도한다.   

해당 메서드는 각 표준 타입의 프로토타입에 의해 정의되고 객체가 원시값으로 변활될 때 무엇을 할지 규정한다. hint로 불리는 인자와 함께 호출되는데, hint 값은 "string"/"number"/"default" 중 하나이다.


"number"/"default" 가 들어온다면
   
1. valueOf() 메서드를 호출 후, 결과가 원시 값이면 반환한다.
2. 그렇지 않으면, toString() 메서드를 호출 후, 결과가 원시 값이면 반환한다.
3. 그렇지 않으면, 에러를 발생시킨다.

"string"이 들어온다면
   
1. toString() 메서드를 호출 후, 결과가 원시 값이면 반환한다.
2. 그렇지 않으면, valueOf() 메서드를 호출 후, 결과가 원시 값이면 반환한다.
3. 그렇지 않으면, 에러를 발생시킨다.

기본 변환 동작을 오버라이드 하기위해, Symbol.toPrimitive를 사용하고 그 값을 기본 함수로 할당해야한다.

```js
function Temperature(degrees) {
	this.degrees = degrees;
}

Temperature.prototype[Symbol.toPrimitive] = function(hint) {
	switch(hint) {
		case "string":
			return this.degrees + "\u00b0"; // 온도 기호
			
		case "number":
			return this.degrees;
			
		case "default":
			return this.degrees + " degrees";
	}
}

let freezing = new Temperature(32);

console.log(freezing + "!"); // "32 degrees!"
console.log(freezing/2); // 16
console.log(String(freezing)); // "32°"
```

각 콘솔 출력문은 다른 hint 인자 값을 사용한다. + 연산자는 "default", / 연산자는 "number", String() 함수는 "string"을 hint로 사용한다.

### Symbol.toStringTag

ES6에서는 Symbol.toStringTag 심벌을 통해 Object.prototype.toString()를 사용하여 네이티브 객체를 식별하는 동작을 재정의한다. 이 심벌은 각 객체의 Object.prototype.toString.call()이 호출되었을 때 어떤 값이 반환되는지 정의하는 프로퍼티를 나타낸다. 배열의 경우 해당 프로퍼티에 "Array"를 저장하여 함수 반환 값을 설정할 수 있다.

```js
function Person(name) {
	this.name = name;
}

Person.prototype[Symbol.toStringTag] = "Person";

let me = new Person("Tom");

console.log(me.toString()); // "[object Person]"
console.log(Object.prototype.toString.call(me)); // "[object Person]"
```

Person.prototype이 Object.prototype.toString() 메서드를 상속하기 때문에, Symbol.toStringTag에서 반환된 값은 me.toString()을 호출할 때도 사용된다. 하지만 여전히 Object.prototype.toString.call() 메서드 사용에 영향을 주지 않고, 다른 동작을 제공하는 toString() 메서드를 정의할 수 있다.

```js
function Person(name) {
	this.name = name;
}

Person.prototype[Symbol.toStringTag] = "Person";
Person.prototype.toString = function() {
	return this.name
};

let me = new Person("Tom");

console.log(me.toString()); // "Tom"
console.log(Object.prototype.toString.call(me)); // "[object Person]"
```






