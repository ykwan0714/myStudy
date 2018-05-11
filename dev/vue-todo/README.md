# vue-todo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2018.05.11

* 문제점 해결
* 뷰 애니메이션 추가 
* Modal 추가

> 참고: keyboard 이벤트들은 input이 없으면 동작하지 않는다. tabindex="0"을 추가하면 동작, 하지만 Modal에 focus가 먼저 가야하는 문제점도 있다.   
> 출처: [stackoverflow](https://stackoverflow.com/questions/49042667/vuejs-keyup-esc-on-div-element-is-not-working?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

## 2018.05.10

기본 기능과 템플릿 추가

### 문제점

* 할 일을 입력했을 때 할일 목록에 바로 반영되지 않는 점
* 할 일을 모두 삭제했을 때 할 일 목록에 바로 반영되지 않는 점

## 2018.05.09

vue-todo 프로젝트 초기 구성

### components 구조

* TodoHeader.vue: 애플리케이션 이름 표시
* TodoInput.vue: 할 일 입력 및 추가
* TodoList.vue: 할 일 목록 표시 및 특정 할 일 삭제
* TodoFooter.vue: 할 일 모두 삭제



