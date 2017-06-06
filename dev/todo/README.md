# Todo App

## 1. 2017-05-28 (commit : 'todo App init')

Todo App의 기본 구조를 생성하였다.

## 2. 2017-06-01 (commit : '170601 /dev/todo commit')

* toggleTodo : 할일을 toggle한다.
* toggleAll : 모든 할일을 toogle한다.
* deleteTodo : 할일을 삭제 한다.
* addTodo : 새로운 할일을 추가한다.

>**이벤트 바인딩 방식**
>
>  1. 선언 될 때마다 this binding
>  : render가 호출될때마다 bind되서 성능상으로 좋지 않음
>
>```javascript
>onKeyDown = {this.handler.bind(this)}
>```
>2. 생성자에서 덮어씌우기
>  : 성능엔 좋지만 많아지면 관리가 힘들다. 또한 instanace가 불필요하게 메서드를 가지게 된다. 즉 proto 및 instance에 동시에 존재한다.
>```javascript
>construcotr(){
>		this.handler = this.handler.bind(this);
>	}
>```
>
>3. 애로우 펑션으로 호출
>: 새로운 scope를 생성한다.
>
>```javascript
>	onKeyDown={e => this.handler(e)}
>```
>
>4. 애로우 펑션으로 정의
> : instance에 할당되나, proto에는 존재하지 않는다.
>
>```javascript
>handler = e => {}; // class property 선언방식 (propsal2)
>```


## 3. 2017-06-04 (commit : '170604 /dev/todo commit')

 Todo App의 기능을 구현 완료하였다.

* editTodo : 할일을 수정하기 위해 수정 모드로 진입 한다.
* cancelEdit : 수정 모드를 취소한다.
* saveTodo : 수정한 할일을 저장한다.
* selectFilter : 필터를 선택한다.
* clearComplete : 완료된 할일들을 제거한다.

## 4. 2017-06-06 (commit : '170604 /dev/todo commit')

App의 state로 저장하였던 todo를 [deployd](http://deployd.com/) 서버로 옮기고, ajax 통신을 통하여 todo를 관리한다.
ajax 통신은 [aixos](https://github.com/mzabriskie/axios>) 사용 하였다.

```javascript
// axios.all을 통해 여러개의 requset를 한번에 처리
const axArr = this.state.todos
					.filter(elem=>elem.isDone)
					.map(elem=> ax.delete(`/${elem.id}`));
		axios.all(axArr)
			.then(()=>{
				const newTodos = this.state.todos.filter(elem=>!elem.isDone);
				this.setState({
					todos : newTodos
				});
			});
```

####  설치 방법 참고

### 1) mongoDB

>**MAC**
>
>  - http://brew.sh/index_ko.html 에서 'Homebrew 설치하기' 아래의 내용을 복사하여 터미널에 붙여넣기.
>  - brew install mongodb
>  - brew update
>
> **Windows**
>
>  - install : https://www.mongodb.com/download-center#community
>  - 설치 후 세팅 필요 : [환경변수세팅](./mongodb_for_windows.md)



### 2) deployd

```bash
$ [sudo] npm i -g deployd
```

http://deployd.com/


#### trouble shooting

```bash
$ dpd -V
/* version check. 0.6.8 이상이면 okay. */
```
http://docs.deployd.com/docs/getting-started/installing-deployd.html


#### initialize

```bash
$ dpd create [DB폴더명]
$ cd [DB폴더명]
$ dpd -d
```

or

```bash
$ dpd create [DB폴더명]
$ dpd [DB폴더명]/app.dpd -d
```

http://docs.deployd.com/docs/getting-started/your-first-api.html


### 3) axios

https://github.com/mzabriskie/axios

```bash
$ npm i -S axios
```