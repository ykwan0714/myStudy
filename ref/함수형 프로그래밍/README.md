## 함수형 프로그래밍

### 함수형 프로그래밍이란?

애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고 함수의 개념을 가장 우선순위에 놓는다.
문제 해결 방법을 동사(함수)들로 구성(조합) 하는 것

```
/* 객채지향 프로그래밍 */
duck.moveLeft();
dog.moveLeft();

/* 함수형 프로그래밍 */
moveLeft(dog);
moveLeft(duck);

```

### 함수형 프로그래밍의 목적

순수함수를 만들어 오류를 줄이고 안정성을 높인다.

> *순수 함수*
> 
> * 들어온 인자를 받으면 항상 동일한 결과를 반환하는 함수
> * 받은 인자 외에 외부의 상태에 영향을 끼치지 않는 함수

```javascript
/* 순수 함수 */
function add(a,b){
  return a+b;
}
console.log(add(10,5));

/* c가 변경이 될 수도 있으니 순수 함수가 아니다 */
var c = 10;
function add2(a,b){
  return a+b+c;
}
console.log(add2(10,5));
c = 20;
console.log(add2(10,5));

/* 부수 효과 (외부의 상태를 변경 및 인자를 변경하는 하는 것) 발생하여
 순수 함수가 아님*/
function add3(a,b){
  c = b;
  return a+b;
}
console.log('c: ', c);
console.log(add2(10,5));
console.log('c: ', c);

/* obj1의 값이 변했다. 순수함수가 아님.. 이러한 함수가 문제라는 것은 아니다. */
var obj1 = { val: 10};
function add4(obj, b){
  obj.val += b;
}
cosole.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val);

/* 순수함수 */
var obj1 = { val: 10 };
funciont add5(obj, b){
	return { val : obj.val + b };
}
cosole.log(obj1.val);
var obj2 = add4(obj1, 20);
console.log(obj1.val);
console.log(obj2.val);

```

> *일급 함수*
>
> 자바스크립트의 함수는 일급 함수이다.
> 
> * 함수를 값으로 다를 수 있다.
> * 함수를 런타임에서 언제나 정의 할 수 있다.
> * 함수를 인자로 전달 할 수 있다.
 
```
// 값을 변수에 저장할 수 있다.
var f1 = function(a) { return a * a; }
console.log(f1);

// 함수 선언식을 값으로 저장할 수 있다.
var f2 = add;
console.log(f2);

// 함수를 인자로 전달
function f3(f){
  return f();
}
console.log(f3(function(){ return 10; }));
console.log(f3(function(){ return 20; }));

/* addMaker (일급함수 + 클로저 + 순수함수 개념이 포함) => 함수형 프로그래밍 */
function addMaker(a){
  return function(b){
    return a+b;
  };
}
var add10 = addMaker(10);
console.log(add10(20));

function f4(f1, f2, f3){
  return f3(f1() + f2());
}
console.log(f4(
  function(){ return 2; },
  function(){ return 1; },
  function(a){ return a * a }
));

```


모듈화 수준을 높여 조합성을 강조하여 생산성을 높인다.


### 함수형으로 전환하기

```javascript
var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 34 },
  { id: 3, name: 'JM', age: 27 },
  { id: 4, name: 'PH', age: 34 },
  { id: 5, name: 'HA', age: 26 },
  { id: 6, name: 'JI', age: 31 },
  { id: 7, name: 'MP', age: 23 }
];
```

1. 명령형 코드

	```javascript 
	//1-1. 30세 이상인 user를 거른다.
	var tempUsers = [];
	for(var i=0; i < users.length; i++){
	  if(users[i].age >= 30){
	    tempUsers.push(users[i]);
	  }
	}
	console.log(tempUsers);
	
	//1-2. 30세 이상인 user의 names를 수집한다.
	var names = [];
	for(var i=0; i < tempUsers.length; i++){
	  names.push(tempUsers.name);
	}
	console.log(names);
	
	//1-3. 30세 미만인 user를 거른다.
	var tempUsers = [];
	for(var i=0; length < users.length; i++){
	  if(users[i].age < 30){
	    tempUsers.push(users[i);
	  }
	}
	console.log(tempUsers);
	
	//1-4. 30세 미만인 user의 ages를 수집한다.
	var ages = [];
	for(var i=0; i < tempUsers.length; i++){
	  ages.push(tempUsers.age);
	}
	console.log(ages);
	```

2. _filter, _map으로 리팩토링

	```javascript 
	//2-1. _filter
	function _filter(list, predi){ // predi는 function (조건을 리턴한다)
	  var newList = [];
	  for(var i=0; length < list.length; i++){
	    if(predi(list[i])){
	      newList.push(list[i);
	    }
	  }
	  return newList;
	}
	console.log(
	  _filter(users, function(user){ return user.age >= 30; })
	);
	console.log(
	  _filter(users, function(user){ return user.age < 30; })
	);
	
	//2-2. _map
	function _map(list, mapper){
	  var newList = [];
	  for(var i=0; i < list.length; i++){
	    newList.push(mapper(list[i]));
	  }
	  return newList;
	}
	var over30 = _filter(users, function(user){ return user.age >= 30; });
	console.log(over30);
	console.log(
	  _map(over30, function(user){ return user.name; })
	);
	console.log(
		_map(_filter(users, function(user){ return user.age >= 30; }),
		function(user){ return user.age; })
	);
	
	var under30 = _filter(users, function(user){ return user.age < 30; });
	console.log(under30);
	console.log(
	  _map(under30, function(user){ return user.age; })
	);
	console.log(
	  _map(_filter(users, function(user){ return user.age < 30; }),
	  function(user){ return user.age; })
	);
	```

3. each

	```javascript
	// each 함수 생성
	function _each(list, iter){
	  for(var i = 0; i < list.length; i++){
	    iter(list[i]);
	  }
	  return list;
	}
	
	//3-1 _filter 함수 변경
	function _filter(list, predi){ 
	  var newList = [];
	  _each(list, function(val){
	    if(predi(val)){
	      newList.push(val);
	    }
	   });
	  return newList;
	}
		
	//3-2 _map 함수 변경
	function _map(list, mapper){
	  var newList = [];
	  _each(list, function(val){
	    newList.push(mapper(val));
	  });
	  return newList;
	}
	
	```
	
4.  다형성

	사실 map과 filter는 Array의 메서드이다. 하지만 array-like(arguments, document.querySelector)등에서는 사용할 수 없다.
	 
	```javascript
	//error
	document.querySelectorAll('*').map(function(node){
	  return node.nodeName;
	});
	
	//work
	_map(document.querySelectorAll('*'), function(node){
	  return node.nodeName;
	});
	```
	
5. 커링 (curring)

	함수와 인자를 다루는 기법. 함수에 인자를 하나씩 적용해 나아가다 필요한 인자가 모두 채워지면 함수를 실행하는 기법.
	
	```javascript
	function _curry(fn){
	  return function(a){
	    return function(b){
	      return fn(a, b);
	    }
	  }
	}
	
	//5-1 add 함수를 통한 예제
	var add = funtion(a, b){
	  return a + b;
	};
	console.log(add(10,5));
	
	var add = _curry(function(a, b){
	  return a + b;
	})
	
	var add10 = add(10);
	console.log(add10(5));
	//위와 결과가 같다. 
	console.log(add(10)(5));
	
	//함수가 return 된다.
	console.log(add(1, 2));
	
	function _curry(fn){
	  return function(a, b){
	    if(arguments.length == 2) return fn(a,b); //수정, 인자가 2개이면 바로 실행
	    return function(b){
	      return fn(a, b);
	    }
	  }
	}
	
	console.log(add(1, 2)); // 정상 동작
	
	var sub = _curry(function(a, b){
	  return a - b;
	});
	console.log(sub(10, 5));
	
	var sub10 = sub(10);
	// 5에서 10을 빼야 할 것 같은데 10에서 5를 빤다... _curryRight 함수를 만들어서 해결하자 
	console.log(sub10(5));
	
	function _curryr(fn){
	  return function(a, b){
	    //인자가 2개일 때는 왼->오지만 인자가 1개일 땐 오->왼 순으로 계산한다.
	    return arguments.length == 2 ? fn(a, b) : function(b){ return fn(b, a); }
	  }
	}
	
	var sub = _curryr(function(a, b){
	  return a - b;
	});
	console.log(sub(10, 5)); // 10-5
	
	var sub10 = sub(10);
	console.log(sub10(5)); // 5-10
	
	// _get 만들어 좀 더 안전하게 구현하기
	function _get(obj, key){
	  return obj == null ? undefined : obj[key];
	}
	
	var user1 = users[0];
	console.log(user1.name);
	console.log(_get(user1, 'name'));
	
	console.log(user[10].name); //error
	console.log(_get(users[10], 'name')); //undefined
	
	//커링을 사용
	var _get = _curryr(function(obj, key){
	  return obj == null ? undefined : obj[key];
	});
	console.log(_get(user1, 'name'));
	console.log(_get('name')(user1)); // name을 꺼내는 함수에, user1을 전달하는 방식
	
	console.log(
		_map(_filter(users, function(user){ return user.age >= 30; }),
		_get('name'))
	);
	
	```
	
6. reduce (줄이다.. 한개의 값으로 누산하여)
	
	```javascript
	function _each(list, iter){
	  for(var i = 0; i < list.length; i++){
	    iter(list[i]);
	  }
	  return list;
	}
	
	function add(a, b){
	  return a + b;
	}
	
	//array like에서 slice 동작을 처리하기 위함
	var slice = Array.prototype.slice;
	function _rest(list, num){
	  return slice.call(list, num || 1);
	}
	
	// memo 초기값
	function _reduce(list, iter, memo){
	  if(arguments.length == 2){
	    memo = list[0];
	    //list = [].slice.call(list, 1);
	    list = _rest(list);
	  }
	  _each(list, function(val){
	    memo = iter(memo, val);
	  });
	  return memo;
	}
	
	console.log(_reduce([1, 2, 3], add, 0));
	console.log(_reduce([1, 2, 3], add));
	console.log(_reduce([1, 2, 3, 4], add, 10));
	
	```

7. reduce를 이용한 pipe 구현

	함수를 다루는 함수, 인자를 함수만 받는다.
  
  ```javascript
   function _each(list, iter){
	  for(var i = 0; i < list.length; i++){
		iter(list[i]);
	  }
	  return list;
	}
	  
	var slice = Array.prototype.slice;
	function _rest(list, num){
	  return slice.call(list, num || 1);
	}
	
	// memo 초기값
	function _reduce(list, iter, memo){
	  if(arguments.length == 2){
	    memo = list[0];
	    list = _rest(list);
	  }
	  _each(list, function(val){
	    memo = iter(memo, val);
	  });
	  return memo;
	}
	function _pipe(){
	  var fns = arguments;
	  return function(arg){
	    return _reduce(fns, function(arg, fn){
	      return fn(arg);
	    }, arg);
	  }
	}
	
	var f1 = _pipe(
	  function(a){ return a + 1; },
	  function(a){ return a * 2; });
	  
	console.log(f1(1));
	
	// _go 구현, 즉시 실행이되는 pipe
	function _go(arg){
		var fns = _rest(arguments); //첫번째 인자는 함수가 아니라 제거
		return _pipe.apply(null, fns)(arg);
	}
	
	_go(1,
	  function(a){ return a + 1; },
	  function(a){ return a * 2; },
	  console.log);
  ```
  
8. 다형성 높이기, 에러 방지

	```javascript
	 // each 함수에 null을 넣어도 에러가 나지 않게
	_each(null, console.log); //error
	
	
	var _length = _get('length');
	function _each(list, iter){
	  for(var i = 0, leng = _length(list); i< len; i++){
	  		iter(list[i]);
	  }
	  return list;
	}
	_each(null, console.log); //work
	
	// _keys 만들기
	console.log(Object.keys({ name : 'ID' , age : 33 }));
	console.log(Ojbect.keys([1, 2, 3, 4]));
	console.log(Object.keys(10));
	//console.log(Objec.keys(null)); // error
	
	function _isObject(obj){
	  return typeof obj == 'object' && !!obj;
	}
	function _keys(obj){
	  return _isObject(obj) ? Object.keys(obj) : [];
	}
	
	console.log(_keys({ name : 'ID' , age : 33 }));
	console.log(_keys([1, 2, 3, 4]));
	console.log(_keys(10));
	console.log(_keys(null)); // work
	
	// _each 외부 다형성 높이기
	_each({
	  13 : 'ID',
	  19 : 'HD',
	  29 : 'YD'
	}, function(name){
	  console.log(name);
	}); // not working
	
	function _each(list, iter){
	  var keys = _keys(list);
	  for(var i = 0, len = keys.length; i< len; i++){
	  		iter(list[keys[i]]);
	  }
	  return list;
	}
	_each({
	  13 : 'ID',
	  19 : 'HD',
	  29 : 'YD'
	}, function(name){
	  console.log(name);
	}); // working

	
	
	```