# Jest

[Jest 공식 홈페이지](https://jestjs.io/en/)

각 섹션 별 폴더를 만들어서 예제를 간략하게 구현해 보았다. (문서에 있는 예제들은 미완성이 많아서ㅜ).  
아래 나오는 기본적인 설정은 다 완료되어 있어 설치 후 사용하면 된다.

```bash
npm i
```


각 폴더 별 테스트 실행은 아래와 같다

```bash
npm test -- /test/폴더명/파일명.test.js
```

## 시작하기

> ./test/getting-started

### Jest 설치

```bash
npm install -D jest
```

### 간단한 예제

두개의 숫자를 더하는 함수를 테스트 하는 코드를 작성하자. `sum.js` 파일은 아래와 같다.

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

실제 테스트를 구현하는 `sum.test.js` 파일은 아래와 같다.

```js
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

`pakage.json` 파일에는 script 구문에 test를 추가해준다.

```js
{
  "scripts": {
    "test": "jest"
  }
}
```

그리고 난 뒤 `npm jest`를 실행하면 Jest는 아래와 같이 메시지를 출력한다.

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

이 테스트에서는 두 값이 정확히 동일한지 테스트하기 위해 `expect`와 `toBe`를 사용했다. Jest가 테스트할 수 있는 기타 사항에 대한 자세한 내용은 [Matcher 사용하기](https://jestjs.io/docs/en/using-matchers)를 참조.

### 커맨드 라인으로 실행하기

cli를 통해 바로 Jest를 실행하려면 global로 설치하면 된다.

```bash
npm i -g jest
```

`my-test.js` 파일을 설정 파일 `config.js`를 이용하여 Jest를 실행하려면 아래와 같이한다.

```js
jest my-test --notify --config=config.json
```

더 많은 옵션들은 [CLI 옵션](https://jestjs.io/docs/en/cli)을 참고하자.

### 설정

#### 기본 설정 파일 만들기

```bash
// ./node_modules/.bin/jest --init
jest --init
```

#### babel 사용하기

babel을 사용하기 위해선 `babel-jest`와 `regenerator-runtime` 패키지를 설치해야한다.

```bash
npm i -D babel-jest babel-core regenerator-runtime
```

> **참고:** babel 버전7을 사용하고 있다면 `babel-jest`,	`babel-core@^7.0.0-bridge.0`와 `@babel/core` 패키지를 설치해야한다.
> 
> ```bash
> npm i -D babel-jest babel-core@^7.0.0-bridge.0 @babel/core regenerator-runtime
> ```

`.babelrc` 파일을 프로젝트의 root 폴더에 추가한다. 예를 들어 ES6를 사용한다면 `babel-preset-env`를 presets에 추가하자.

```js
// .babelrc
{
  "presets": ["env", "react"]
}
```

> **참고:** Babel의 `env` 옵션을 사용하여 보다 복잡한 Babel 구성을 사용하는 경우, Jest가 자동으로 `NODE_ENV`를 `test`로 정의한다는 점에 유의해야한다. `NODE_ENV`가 설정되지 않은 경우엔 `development` 섹션은 사용되지 않는다.

```js
// .babelrc (env 옵션 사용)
{
  "presets": ["env"],
  "env": {
    "test": {
      "presets": ["env"]
    }
  }
}
```

> **참고:*** Jest를 설치할 때 `babel-jest`가 자동으로 설치되고 프로젝트에 `.babelrc`가 있으면 파일이 자동으로 변환된다. 이 동작을 방지하려면 `transform` 옵션을 재설정할 수 있다.

```js
// package.json
{
  "jest": {
    "transform": {}
  }
}
```

## Matcher 사용하기

> ./test/using-matchers 

Jest는 "matchers"를 사용하여 값을 테스트할 수 있다. 일반적으로 사용되는 몇가지 Matcher를 소개한다. 전체 Matcher 목록을 보고 싶다면 [expect API DOC](https://jestjs.io/docs/en/expect)을 참조하자.

### Matcher

```js
// common-matchers.test.js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

위의 코드에서 `expect(2 + 2)`는 "expectation" 객체를 리턴한다. expectation 객체는matcher들이 해당 값들을 호출하지 않는 이상 의미가 없는 값이다. 위의 코드에선 `.toBe(4)`가 matcher가 된다. Jest가 실행되면 실패한 모든 matcher들을 추적하여 적합한 오류 메시지를 출력해 준다.

`toBe`는 `Object.is`를 시용하여 정확한 **평등** 테스트를 한다.

```js
// common-matchers.test.js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

`not`을 이용하여 matchers의 반대 테스트할 수도 있다.

만약 객체의 **값을 확인**하려면 `toEqual`를 사용한다. `toEqaul`은 객체, 배열의 모든 필드를 반복적으로 검사한다.

```js
// common-matchers.test.js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

### Truthiness

* `toBeNull`는 오직 `null`과 매칭된다.
* `toBeUndefined`는 오직 `undefined`과 매칭된다.
* `toBeDefined`는 `toBeUndefined`과 반대이다
* `toBeTruthy`는 `if`의 상태값이 ture일 경우 매칭된다.
* `toBeFalsy`는 `if`의 상태값이 false인 경우 매칭된다.

```js
// truthiness.test.js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

### 숫자

```js
// number.test.js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe와 toEqual는 숫자에 대해선 동일한 기능을 수행한다.
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

소수점에 대한 평등비교는 `toEqaul`대신 `toBeCloseTo`를 사용한다.

```js
// number.test.js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); 동작하지 않는다.
  expect(value).toBeCloseTo(0.3); // 정상 동작
});
```

### 문자열 

`toMatch`를 이용하여 정규표현식을 사용할 수 있다.

```js
// strings.test.js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

### 배열

`toContain`을 사용하여 배열의 항목이 포함되어 있는지 확인할 수 있다.

```js
// arrays.test.js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});
```


## 비동기 코드 테스팅

> ./test/testing-asynchronous

### Callback

가장 일반적인 비동기 패턴인 callback이 있다.

예를 들어, 어떤 `data`를 가져온 후 `callback(data)`를 호출하는 기능이 있는 `fetchDatat(callback)` 함수가 있다. 여기서 반환되는 `data`값이 `peanut butter`인지 테스트하고자 한다.

기본적으로 Jest 테스트는 실행이 끝나면 완료된다. 즉, 아래의 테스트는 의도한대로 동작하지 않는다.

```js
// callbacks.test.js
function fetchData(cb) {
  setTimeout(() => {
    console.log('log printed after finising test')
    cb('peanut butter')
  })
}

// 하지 말 것
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

이 코드의 문제는 callback이 호출되기도 전에, fetchData가 완료되는 즉시 테스트가 완료 된다는 것이다.

test 함수에 argument로 `done`을 추가해주자.  Jest는 테스트를 끝내기 전에 `done` 콜백이 호출될 때 까지 기다릴 것이다.

```js
// callbacks.test.js
function fetchData2(cb) {
    setTimeout(() => {
      console.log('log printed before finising test')
      cb('peanut butter')
    })
  }
  
  test('the data is peanut butter 2', done => {
    function callback(data) {
      expect(data).toBe('peanut butter');
      done();
    }
  
    fetchData2(callback);
  });
```

만약 `done`이 불리지 않는다면, 테스트는 실패할 것이다.


### 프라미스

만약 프라미스를 사용한다면, 비동기 테스트를 하는 것은 더 단순하다. 테스트에서 프라미스를 리턴하라. 그러면 제스트는 프라미스가 resolve될 때 까지 기다릴 것이다. 만약 프라미스가 reject 된다면 테스트는 자동적으로 실패할 것이다.

```js
// promises.test.js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter');
    });
  })
}

test('the data is peanut butter', () => {
  expect.assertions(1);
  
  // 아래와 동일 expect(fetchData()).resolves.toBe('peanut butter');
  return fetchData().then(data => {
    expect(data).toBe('peanut butter'); // assertion
  });
});
```

프라미스가 reject되는 것을 기대한다면 `.catch` 메서드를 사용한다. 

```js
// promises2.test.js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    });
  })
}

test('the fetch fails with an error', () => {
  expect.assertions(1);
  
  // 아래와 동일 return expect(fetchData()).rejects.toMatch('error');
  return fetchData().catch(e => {
    expect(e).toMatch('error')); // assertion
  }
});
```

> expect.assertaions는 테스트 도중 불릴 assertion 숫자를 보장한다. 이 것은 콜백 내의 assertion이 실제로 호출되었는지 확인하기 위해 비동기 코드를 테스트할 때 유용하다.



## 설정 및 해체

### 반복되는 설정하기

테스트를 위해 반복적으로 수행해야하는 작업이 있다면, `beforeEach`와 `afterEach`를 사용할 수 있다.

예를 들어 여러 테스트가 도시 DB와 상호 연결되어 있다고 가정 해본다. `initializeCityDatabase()`는 각 테스트 전에 호출해야하는 메서드이고 `clearCityDatabase()`는 각 테스트 후에 호출해야하는 메서드다

```js
// repeating-setup.test.js
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

### 한번만 설정 하기

경우에 따라 파일 시작 부분에서 한 번만 설정해야 한다. `beforeAll`과 `afterAll`을 사용할 수 있다.

```js
// one-time-setup.test.js
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```


### Scoping

기본 적으로 `before`와 `after` 블럭은 파일 안에 있는 테스트에 매번 적용된다. 또한 `describe` 블럭을 사용하여 그룹 테스트를 할 경우엔 `before`와 `after` 블럭들은 그 안에서만 적용 된다.

```js
// scoping.test.js
// 현재 파일의 모든 테스트에 적용된다.
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // describe 블럭 안에 있는 테스트에만 적용된다.
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

최상단 `beforeEach`는 `describe` 블록의 `beforeEach` 보다 먼저 실행된다. 

```js
// scoping-2.test.js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

### describe와 test 블럭의 실행 순서

Jest는 실제 `test`들을 실행하기 전에 모든 `describe` 핸들러를 실행한다. 이는 설정 및 해제를 `describe` 블록보단 `before*`, `after*` 핸들러에서 해야할 또 다른 이유이다. `describe` 블록이 완료가 되면, Jest는 기본 적으로 모든 테스트를 순서에 맞춰 연속적으로 수행하고 각 테스트가 완료 될 때까지 기다린다.

```js
// order-of-excuton.test.js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

### 일반적인 조언

테스트가 실패할 경우 가장 먼저 확인해야 할 사항은 한개의 테스트가 존재해도 테스트가 실패하는 지 여부이다. Jest에서는 `test.only`를 사용하여 오직 한개의 테스트만 수행할 수 있다.

```js
// general-advice.test.js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(true);
});

test('this test will not run', () => { // skip 된다.
  expect('A').toBe('A'); 
});
```

## 함수 따라하기 (Mock Functions)

> ./test/mock-funcions/

함수 따라하기에는 두가지 방법이 있다. 테스트 코드에 mock 함수를 만들거나 모듈 의존성을 오버라이드 하기 위한 `manual mock`를 사용하는 것이다.

### mock 함수 사용하기 

제공된 배열의 각 항목에 대해 콜백을 호출하는 `forEach`함수의 기능을 테스트 한다고 가정한다.

```js
// using-mock-function.test.js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

이 함수를 테스트하기 위해 mock 함수를 사용할 수 있다. 또한 예상대로 콜백이 호출되는지 확인하기 위해 mock 상태를 검사한다.

```js
// using-mock-function.test.js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// mock 함수가 두 번 호출 된다.
expect(mockCallback.mock.calls.length).toBe(2);

// 처음 호출 된 함수의 첫번째 argument는 0이다 
expect(mockCallback.mock.calls[0][0]).toBe(0);

// 처음 호출 된 함수의 첫번째 argument는 1이다 
expect(mockCallback.mock.calls[1][0]).toBe(1);

// 처음 호출 된 함수의 리턴 값은 42이다.
expect(mockCallback.mock.results[0].value).toBe(42);
```

### `.mock` 속성

모든 mock 함수에는 함수 호출 방법과 반환된 함수에 대한 데이터가 저장되는 특별한 `.mock` 속성이 있다. 또한 `.mock` 속성은 각 호출에 대한 `this` 값을 추적하므로 이 값도 검사할 수 있다.

```js
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```

이러한 mock 속성들은 함수들이 어떻게 호출되거나 인스턴스화되거나 반환되는지를 입증할 때 매우 유용하다.

### mock 반환 값

mock 함수는 테스트 도중 코드에 테스트 값을 주입할 수 있다.

```js
test('Mock Return Values', () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true
});
```

```js
test('Mock Return Values 2', () => {
  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter(filterTestFn);

  console.log(result);
  // > [11]
  console.log(filterTestFn.mock.calls);
  // > [ [11], [12] ]
});
```

### 모듈 흉내내기

API로 부터 유저 정보를 가지고오는 클래스가 있다고 가정하자. 클래스는 API를 호출하기 위해 `axios`를 사용하고 모든 `data` 속성에 유저 정보를 담고 있는 값을 리턴한다.

```js
// mocking-modules.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

실제 API를 호출하지 않고 테스트를 하기 위해 자동적으로 axios 모듈을 흉내내는 `jest.mock(...)` 함수를 사용했다.

일단 모듈을 흉내내고 나면 테스트에서 입증하고자 하는 리턴 데이터를 위한 `mockResolvedValue`를 제공한다. 이는테스트를 통해 axios.get('/users.json')이 가짜 응답을 받을 것이란 것을 의미한다.

```js
// mocking-modules.test.js
import axios from 'axios';
import Users from './mocking-modules';

jest.mock('axios');

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  // 아래와 같은 방법으로도 사용할 수 있다.
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  axios.get.mockResolvedValue(resp);

  return Users.all().then(users => expect(users).toEqual(resp.data));
});
```

### 모의 구현

`jest.fn` 또는 `mockImplementation`를 통해 함수를 모의 구현을 할 수 있다.

```js
// mock-implementations.test.js
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > true
```

다른 모듈에서 생성된 mock 함수의 기본 구현을 정의해야 하는 경우 `mockImplementation` 메서드가 유용하다.

```js
// mock-implementations.js
module.exports = function() {
  return 54
};

// mock-implementations.test.js
jest.mock('./mock-implementations'); // 이 곳에서 자동 mocking이 일어난다.
const foo = require('./mock-implementations');
    
// foo는 mock 함수 이다.
foo.mockImplementation(() => 42);
foo();
```

여러 함수 호출에서 서로 다른 결과를 얻을 수 있도록 mock 함수의 복잡한 동작을 재생성해야 하는 경우 `mockImplementationOnce` 메서드를 사용한다.

```js
// mock-implementations.test.js
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

mock 함수에 `mockImplementationOnce`로 정의된 구현이 호출보다 적다면 `jest.fn`으로 설정한 기본 구현이 실행된다. 

```js
// mock-implementations.test.js
const myMockFn = jest
  .fn(() => 'default') // 기본 구현 설정
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

mock 함수에서 항상 `this`를 리턴해야하는 경우엔, `.mockReturnThis()` 함수를 사용하면 된다.

```js
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// 아래와 같다.

const otherObj = {
  myMethod: jest.fn(function() {
    return this;
  }),
};
```

### Mock 이름 

mock 함수에 부가적으로 이름을 줄 수 있다. 테스트가 에러날 경우 "jest.fn" 대신 설정한 이름이 표시되기 때문에, mock 함수가 에러가 날 경우 어떤 함수에서 에러가 났는지 빠르게 알아차릴 수 있다.

```js
// mock-implementations.test.js
const myMockFn = jest
      .fn()
      .mockReturnValue('default')
      .mockImplementation(scalar => 42 + scalar)
      .mockName('add42');

      expect(myMockFn(1)).toEqual(43)
```

### Custom Matchers

mock 함수를 좀 더 간단하게 만들기 위한 Custom Matcher들이 있다.

```js
// The mock function was called at least once
expect(mockFunc).toBeCalled();
// expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc).toBeCalledWith(arg1, arg2);
// expect(mockFunc.mock.calls).toContain([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc).lastCalledWith(arg1, arg2);
// expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();

```