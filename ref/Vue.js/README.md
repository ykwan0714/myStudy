해당 문서는 Vue.js 공식 가이드 문서를 참고하여 요약해 놓은 문서입니다.  
자세한 내용은 [Vue.js 배우기](https://kr.vuejs.org/v2/guide/) 참고 하세요.

# Vue.js

## 시작하기

단순히 `index.html` 파일을 만들고 Vue를 아래와 같이 포함할 수 있다.

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## Vue 인스턴스

모든 Vue 앱은 `Vue` 함수로 새 Vue 인스턴스를 만드는 것 부터 시작한다.

```html
<div id="example">
  <span>메시지: {{ message }}</span>
</div>

```
```javascript
var app = new Vue({
  // 옵션
  el: '#example', // 타게팅 할 엘리먼트
  data: {  // 사용할 데이터 객체
    message: '안녕하세요'
  }
})
```
```html
// 결과
<div id="example">
  <span>메시지: 안녕하세요</span>
</div>

```

Vue 인스턴스를 생성할 때에는 options 객체를 전달해야 한다. 전체 옵션 목록은 [이곳](https://kr.vuejs.org/v2/api)에서 확인할 수 있다.

## 템플릿 문법


### 데이터 바인딩

데이터 바인딩은 HTML 화면 요소를 뷰 인스턴스의 데이터와 연결하는 것을 의미한다. 주요 문법으로는 `{{ }}`과 `v-bind` 속성이 있다.

#### {{ }} - 콧수염 괄호

```html
<div id="example">
  <!-- 콧수염 괄호 -->
  <span>메시지: {{ message }}</span>
</div>

```
```javascript
var app = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  }
})
```

#### v-bind

v-bind는 HTML 속성 값에 뷰 데이터 값에 데이터 값을 연결할 때 사용하는 데이터 연결 방식이다. 사용 방법은 v-bind 속성으로 지정할 HTML 속성이나 props 속성 앞에 접두사로 붙여준다.

```html
<div id="example">
  <p v-bind:id="idA">아이디 바인딩</p>
  <p v-bind:class="classA">클래스 바인딩</p>
  <p v-bind:style="styleA">스타일 바인딩</p>
</div>

```
```javascript
var app = new Vue({
  el: '#example',
  data: {
    idA: 10,
    classA: 'container',
    styleA: 'color:blue'
  }
})
```

[자세히 보기](https://kr.vuejs.org/v2/guide/syntax.html)

## Computed Attribute

템플릿을 사용하는 것은 단순하지만 너무 많은 로직을 템플릿 안에 넣으면 유지보수가 어렵다.  
이럴 땐 computed attribute를 사용해야 한다.

```html
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <!-- bad -->
  <p>뒤집히도록 계산된 메시지: "{{ message.split('').reverse().join('') }}"</p>
  <!-- good -->
  <p>뒤집히도록 계산된 메시지: "{{ reversedMessage }}"</p>
</div>

```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split('').reverse().join('')
    }
  }
})
```

computed attribute를 사용하지 않고 methods attribute를 사용해도 상관은 없지만 computed attribute는 캐시가 된다는 것! 종속성의 일부가 변경된 경우에만 다시 계산 된다. ( 위의 예제에선 `message`가 변경되었을때 다시 계산 된다. 즉, `message`가 변경되지 않으면 `reversedMessage`를 다른 곳에서 호출 시 계산하지 않고 이전에 계산된 결과를 즉시 반영한다. )

만약 아래와 같이 현재 시간을 리턴하는 계산된 속성을 사용한다고 보자.

```javacript
computed: {
  now: function () {
    return Date.now()
  }
}
```

해당 시간은 캐싱이 되어 절대 몇번을 호출하여도 업데이트되지 않는다. 이처럼 캐싱이 필요 없이 갱신되어야 하는 정보는 method로 작성해야한다.


### Computed Setter

계산된 속성은 기본적으로 getter만 가지고 있지만, 필요한 경우 setter를 제공할 수 있다.

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    firstName: 'Yongkwan',
    lastName: 'Lim'
  },
  computed: {
    fullName: {
	  // getter
	  get: function () {
	    return this.firstName + ' ' + this.lastName
	  },
	  // setter
	  set: function (newValue) {
	    var names = newValue.split(' ')
	    this.firstName = names[0]
	    this.lastName = names[names.length - 1]
	  }
	}
  }
})

console.log(vm.fullname) // 'Yongkwan Lim'
vm.fullName = 'John Doe';
console.log(vm.fullname) // 'John Doe'
```


### Watcher

데이터가 변경될 때마다 특정한 동작을 수행하고 싶은 경우 watch 옵션을 사용하면 됩니다.

```html
<div id="example">
  <p>
    입력하세요:
    <input v-model="question">
  </p>
  <p>{{ question }}</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    question: ''
  },
  watch: {
    // 사용자가 입력할 때 마다 이 기능이 실행됩니다.
    question: function (input) {
      this.question = input
    }
  }
})
```


## HTML 클래스 / 스타일 바인딩


```html
<div id="example">
   // isActive가 true이면 active 클래스가 추가, hasError가 true이면 text-danger 클래스가 추가
   <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

   // 일반 class 속성과 혼합하여 사용 가능, 객체로도 사용 가능 / 스타일도 적용 가능
   <div class="static" v-bind:class="classObject" v-bind:style="styleObject"></div>
   
   // 계산된 속성에도 바인딩 가능, 스타일도 적용 가능
   <div class="static" :class="computedClass" :style="{ color: activeColor, fontSize: fontSize + 'px'}"></div>
   
   // 배열을 전달하여 바인딩 가능
   <div class="static" :class="[activeClass, errorClass]"></div>

</div>   
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    /* class */
    isActive: true,
    hasError: false,
    classObject: {
      active: false,
      'text-danger': true
    },
    activeClass: 'active',
    errorClass: 'text-danger',
    /* style */
    activeColor: 'red',
    fontSize: 30,
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  },
  computed: {
     computedClass: function () {
        return {
           active: this.isActive ,
          'text-danger': this.hasError
        }
     }
})

```

```html
// 결과
<div id="example">
   <div class="active"></div>
   <div class="static text-danger"></div>
   <div class="active" style="color: red; font-size: 30px;"></div>
   <div class="static text-danger"></div>
</div>
```

## 조건부 렌더링

### v-if / v-else

```html
<div id="example">
   <h1 v-if="ok">Yes</h1>
   <h1 v-else>No</h1>
</div>   
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    ok: true
  }
})
```
```html
// 결과
<div id="example">
   <h1>Yes</h1>
</div>
```

`v-if`는 디렉티브이기 때문에 하나의 엘리먼트에만 적용할 수 있다. 하나 이상의 엘리먼트에 if를 적용하려면 `<template>` 엘리먼트에 적용하면 된다.

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
```html
// 결과 ( 위 디렉티브의 ok 값이 true일 경우 )
<h1>Title</h1>
<p>Paragraph 1</p>
<p>Paragraph 2</p>
```


### v-else-if

> 2.1.0부터 새롭게 추가됨

```html
<div id="example">
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    type: 'D'
  }
})
```
```html
// 결과 
<div>
  Not A/B/C
</div>
```

### v-show

엘리먼트를 조건부로 표시하기 위한 또 다른 방법은 `v-show` 디렉티브가 있다.

```html
<h1 v-show="ok">안녕하세요!</h1>
```
```html
// 결과 ( 디렉티브의 ok이 값이 false인 경우 )
<h1 style="display: none;">안녕하세요!</h1>
```

### v-if vs v-show

`v-if`는 디렉티브의 값에 따라 렌더링 유무가 결정이 나지만, `v-show`인 경우는 항상 렌더링이 된다는 것이다. ( `v-show`는 단순히 `display` style 속성이 변경된다. )

자주 변경하기를 원한다면 `v-show`를, 그게 아니라면 `v-if`를 사용하도록 하자.

### key

`key`를 이용한 재사용 가능한 엘리먼트 제어가 가능하다. Vue는 엘리먼트를 효율적으로 렌더링 하려고 한다. 아래와 같은 예제를 보자.

```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요">
</template>
```

위의 코드에서 `loginType`을 바꾸어도 사용자가 `<input>`태그에 입력한 내용은 지워지지 않는다. 엘리먼트를 재사용하기 때문이다. ( `placeholder`는만 변경 ) 하지만 이 두 엘리먼트는 완전히 별개이므로 해당 현상은 바람직하지 않다. `key` 속성을 추가하여 해결할 수 있다.

```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요" key="username-input">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요" key="username-input">
</template>
```

이렇게 되면 `loginType`이 변경될 때마다 `<input>`태그가 다시 렌더링 된다.

## 리스트 렌더링 

### v-for

`v-for` 디렉티브를 사용하여 배열을 기반으로 리스트 렌더링을 할 수 있다.

```html
<ul id="example">
  <!-- 기본 사용 법 -->
  <li v-for="item in items">
    {{ item.message }}
  </li>
  <!-- 인덱스도 전달 받을 수 있다 -->
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
  <!-- 숫자도 사용할 수 있다 -->
  <li v-for="n in 3">{{ n }} </span>
</ul>
```
```javascript
var app = new Vue({
  el: '#example',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
```html
// 결과
<ul id="example">
  <li>Foo</li>
  <li>Bar</li>
  <li>Parent - 0 - Foo</li>
  <li>Parent - 1 - Bar</li>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

### v-for와 object

`v-for`를 사용하여 객체의 속성을 반복할 수 있다.

```html
<ul id="example">
  <!-- 기본 사용 법 -->
  <li v-for-object="value in object">
    {{ value }}
  </li>
  <!-- 인자로 key, index를 받을 수 있다 -->
  <li v-for-object="(value, key, index) in object">
    {{ value }}. {{ key }} : {{ value }}
  </li>
 </ul>
```
```javascript
var app = new Vue({
  el: '#example',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```
```html
// 결과
<ul id="example">
  <li>John</li>
  <li>Doe</li>
  <li>30</li>
  <li>0. firstName: John</li>
  <li>1. lastName: Doe</li>
  <li>2. age: 30</li>
</ul>
```

### key

Vue가 각 노드의 id를 추적하고 기존 엘리먼트를 재사용 및 정렬할 수 있드록 key 속성을 제공해야 한다. 이는 가능하면 언제나 `v-for`에

```html
<ul id="example">
  <li v-for-object="(value, key, index) in object" :key="key">
    {{ value }}. {{ key }} : {{ value }}
  </li>
 </ul>
```

### 배열변경 감지

Vue는 배열과 관련된 변이 메소드 ( 원본 배열이 수정되는 ) 에 트리거를 걸어 감시하고 있습니다.

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

콘솔에서 이전 예제의 `items`배열에 새로운 아이템을 추가 (`app.items.push({'message': 'Baz'})`) 하게 된다면 리스트가 자동 갱신됩니다.

아래와 같은 경우에는 자동 갱신이 되지 않습니다.

1. 인덱스로 배열에 있는 항목을 직접 설정하는 경우, 예: `app.items[indexOfItem] = newValue`
2. 배열 길이를 수정하는 경우, 예: `app.items.length = newLength`


### 이벤트 핸들링

```html
<div id="example">
  <!-- 기본 -->
  <button v-on:click="counter += 1">Add 1</button>
  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p> </ul>
  <!-- 메소드 이벤트 핸들러 -->
  <button v-on:click="handleCount">Add 1</button>
  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p> </ul>
  <!-- 인라인 메소드 핸들러, 네이티브 이벤트를 받기 위해 $event 변수 사용 -->
  <button :click="say('hello', $event)">Add 1</button>
</div>
```
```javascript
var app = new Vue({
  el: '#example',
  data: {
    counter: 0
  },
  methods: {
    handleCount: function(event){
       this.counter += 1
       // event는 네이티브 DOM 이벤트
       console.log(event)
    },
    say: function (msg, event) {
       if (event) event.preventDefault()
       alert(msg)
    }
  }
})
```

### 이벤트 수식어

이벤트 핸들러 내부에서 `event.preventDefault()` 또는 `event.stopPropagation()`를 호출하는 것은 보편적인 일이다. 허나 Vue는 `v-on` 디렉티브에 이벤트 수식어를 제공한다.

* .stop
* .prevent
* .capture
* .self
* .once

```html
<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a v-on:click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 수식어는 체이닝 가능합니다 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 단순히 수식어만 사용할 수 있습니다 -->
<form v-on:submit.prevent></form>

<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
<!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div v-on:click.capture="doThis">...</div>


<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
<!-- 자식 엘리먼트에서는 안됩니다 -->
<div v-on:click.self="doThat">...</div>
```

### 키 수식어

키보드 이벤트의 키코드나 키 alias를 사용하여 특정키에만 이벤트를 걸 수가 있다.

```html
<!-- keyCode가 13일 때만 `vm.submit()`을 호출합니다  -->
<input v-on:keyup.13="submit">

<!-- 위와 같습니다 -->
<input v-on:keyup.enter="submit">

<!-- 약어 사용도 가능합니다 -->
<input @keyup.enter="submit">
```

[자세히 보기](https://kr.vuejs.org/v2/guide/events.html#%ED%82%A4-%EC%88%98%EC%8B%9D%EC%96%B4)


## 컴포넌트

기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는데 도움이 된다. Vue 컴포넌트는 Vue 인스턴스이기도 하다. 컴포넌트 생성은 아래와 같이 한다.

```html
<div id="example">
  <my-component></my-component>
  <my-component-child></my-component-child>
</div>
```

```javascript
// 전역 컴포넌트 생성
Vue.component('my-component', {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
})
// 지역 컴포넌트 생성
var Child = {
  template: '<div>사용자 정의 지역 컴포넌트 입니다!</div>'
}

// 루트 인스턴스 생성
new Vue({
  el: '#example',
  components: {
      // <my-component-child> 는 상위 템플릿에서만 사용할 수 있습니다.
  	  'my-component-child': Child
  }
})
```

루트 인스턴스를 생성하기전에 컴포넌트가 **먼저** 등록되어야 한다. 아래와 같이 렌더링 된다.

```html
<div id="example">
  <div>사용자 정의 컴포넌트 입니다!</div>
</div>
```

> 전역 컴포넌트와 지역 컴포넌트의 차이   
> 전역 컴포넌트는 인스턴스를 새로 생성할 때 마다 인스턴스에 components 속성을 등록할 필요 없이 한번 등록하면 언제든지 사용할 수 있다.   
> 반면에 지역 컴포넌트는 새 인스턴스를 생성할 때 마다 등록해 주어야한다.

**컴포넌트에서 data는 반드시 함수여야한다.** 객체로 정의할 경우 생성된 모든 인스턴스에 동일한 객체가 참조로 공유된다. 함수로 정의함으로써 새로운 인스턴스가 생성될 때마다 호출하여 초기 데이터의 새 복사본을 반환할 수 있다. 만약 함수로 사용하지 않을 경우 Vue는 경고를 출력한다. 아래와 같이 data는 함수로 사용하자.

```html
<div id="example">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```javascript
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return {
    	conter: 0
    }
  }
})

new Vue({
  el: '#example'
})
```


### Props

모든 컴포넌트 인스턴스는 자체 스코프가 존재한다. 즉 자식 컴포넌트의 템플릿에서 부모 데이터를 직접 참조할 수 없다. 부모 컴포넌트의 데이터는 **props** 옵션을 사용하여 자식 컴포넌트로 전달하여 사용해야한다. 하위 컴포넌트에서는 `props` 옵션을 사용하여 받을 props를 선언해줘야한다.

![props](https://github.com/ykwan0714/myStudy/blob/master/ref/Vue.js/props-events.png?raw=true)
 
Vue.js에서 부모-자식 컴포넌트 관계는 **props는 아래**로 **events는 위로** 전달된다. 부모는 **props**를 통해 자식에게 데이터를 전달하고, 자식은 **events**를 통해 부모에게 메시지를 보낸다.

> amelCased prop을 사용한다면 HTML에서는 해당하는 kebab-case(하이픈)을 사용해야 한다.   
> ex) prop name: parentMessage이면 html: parent-message 이다.


```html
<div id="example">
  <!-- HTML는 kebab-case -->
  <child message="안녕하세요" v-bind:parent-message="msg"></child>
</div>
```
```javascript
Vue.component('child', {
  // props 정의, JavaScript는 camelCase
  props: ['message', 'parentMessage'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<div><span>{{ message }}</span><br/><span>{{ parentMessage }}</span></div>'
})

new Vue({
  el: '#example',
  data: {
  	msg : '안녕하세요. 부모로 부터 전달된 메시지 입니다.',
  	todo: {
  	   text: 'Learn Vue',
  	   isComplete: false
  	}
  }
})

```

### Events

이벤트 발생과 수신은 $emit()과 v-on: 속성을 이용하여 구현한다. 

```html
<div id="example">
  <!-- 이벤트 수신 -->
  <child v-on:show-log="printText"></child> 
</div>
```
```javascript
Vue.component('child', {
   template: '<button v-on:click="showLog">show</button>',
   methods: {
   		showLog: function(){
   			this.$emit('show-log'); /* 이벤트 발생 */
   		}
   }
})

new Vue({
  el: '#example',
  data: {
  	msg : '안녕하세요. 부모로 부터 전달된 메시지 입니다.'
  },
  methods: {
  	printText: function() {
  		console.log('이벤트를 전달 받았습니다.');
  	}
  }
})

```

### 같은 레벨간 컴포넌트 통신

 컴포넌트 고유의 유효 범위 (scope) 때문에 같은 레벨간 컴포넌트 통신은 하위에서 공통 상위 컴포넌트로 이벤트를 전달한 후 공통 상위 컴포넌트에서 하위 컴포넌트에 props를 내려 보내야 한다. 이런 통신 방식은 상위 컴포넌트가 필요 없음에도 불구하고 같은 레벨 간에 통신하기 위해 강제로 상위 컴포넌트를 두어야 한다.

### 같은 레벨간 컴포넌트 통신 - 이벤트 버스 

이벤트 버스(Event Bus)는 개발자가 지저한 2개의 컴포넌트 간에 데이터를 주고 받을 수 있는 방법이다. 상위-하위 관계를 유지하고 있지 않아도 데이터를 한 컴포넌트에서 다른 컴포넌트로 전달할 수 있다.

이벤트 버스를 구현하려면

1. 새로운 인스턴스 생성
2. 보내는 컴포넌트는 `.$emit` 구현
3. 받는 컴포넌트는 `.$on` 구현


```html
<div id="example">
  <!-- 이벤트 수신 -->
  <child></child> 
</div>
```
```javascript
var eventBus = new Vue();  // 이벤트 버스를 위한 추가 인스턴스
Vue.component('child', {
   template: '<div>하위 컴포넌트 영역입니다.<button v-on:click="showLog">show</button></div>',
   methods: {
   		showLog: function(){
   			eventBus.$emit('triggerEventBus', 100); /* 이벤트 발생 */
   		}
   }
})

new Vue({
  el: '#example',
  created: function(){
  	eventBus.$on('triggerEventBus', function(value) {
  		console.log('이벤트를 전달 받음. 전달 받은 값 :', value);
  	});
  }
})

```

이벤트 버스를 활용하면 props속성을 이용하지 않고도 원하는 컴포넌트 간에 직접적으로 데이터를 전달할 수 있어서 편리하지만 컴포너넌트가 많아지면 관리가 되지 않는 문제점이 있다. Vuex(뷰엑스)라는 상태관리 도구가 필요하다.

[자세히 보기](https://kr.vuejs.org/v2/guide/components.html)
