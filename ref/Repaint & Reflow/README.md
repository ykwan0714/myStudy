## Repaint & Reflow

* Reflow (Layout) : DOM 노드의 레이아웃 수치를 계산하여 렌더트리를 배치하는 과정

* Repaint (Redraw) : 스타일의 변화로 인해 노드의 시각적 요소가 표현되는 과정


### 브라우저 렌더링은 어떻게 돌아가는가?


| Step1 | Step2 | Step3 | Step4 |
|---|---|---|---|
| HTML Tags | DOM Tree | Render Tree  | Paint |
| CSS | Style Struct | Render Tree  | Paint |  


* [Step1] 문서 파싱 : HTML 문서를 파싱하여 "Content Tree"에서 태그를 DOM 노드로 변환하고, 외부 CSS 파일을 포함하여 스타일 요소도 파싱한다.

* [Step2] 렌더트리 생성 : Step1에서 얻은 스타일 정보와 HTML 표시 규칙을 가지고 "렌더트리"를 생성한다. 렌더트리는 색상과 면적과 같은 시각적 속성 정보를 가지고 있다.

* [Step3] 렌더트리 배치 (Reflow) : Step2에서 생성된 렌더트리를 기반으로 각 노드가 화면에 정확한 위치에 표시되도록 배치하는 과정이다.

* [Step4] 그리기 (Repaint) : Step3에서 배치된 노드들을 가로지르며 그리는 과정으로 visibility, outline, background-color와 같이 시각적 속성에 해당하는 정보를 입힌다.

Reflow가 발생되면 Step3, Step4가 반복된다.

과도한 Reflow는 CPU의 소모 비용이 커서 사용자 경험을 해칠 수 있다.


### Reflow

#### 무엇이 Reflow를 발생시킬까?

* 윈도우 리사이징* 폰트의 변화* 스타일 추가 또는 제거* 내용 변화 (인풋박스에 텍스트 입력 등..) :hover와 같은 CSS Pseudo Class 클래스 Attribute의 동적 변화* JS를 통한 DOM 동적 변화* 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시 스타일 Attribute 동적변화


#### 어떤 CSS 속성이 Reflow를 발생시킬까?

위치 크기, 다른 노드에 영향을 줄수있는 속성이 적용되는 경우 발생한다.

|  |  |
|---|---|
|width|height|
|padding|margin|
|display|border-width|
|border|top|
|position|font-size|
|float|text-align|
|overflow-y|font-weight|
|overflow|left|
|font-family|line-height|
|vertical-align|right|
|clear|	white-space|
|bottom|min-height|



### Repaint

#### 어떤 CSS 속성이 Repaint를 발생시킬까?

|  |  |
|---|---|
|color|border-style|
|visibility|background|
|text-decoration|background-image|
|background-position	|background-repeat|
|outline-style	|border-radius|
|outline-width	|box-shadow|
|background-size	||

레이아웃은 변하지 않는데 시각적인 속성이 변경될떄...


### Reflow 방지를 위한 코딩 습관

* css 하위 선택자는 필요한 만큼만!

	```
	//bad
	.wrapper .box ul li span .ico { ... }
	
	//better
	.wrapper .ico { ... }
	
	```

* flex 박스 사용

* 강제 동기식 레이아웃(forced synchronous layout) 피하기 

	화면에 프레임을 추가하는 순서는 다음과 같다.
	
	JavaScript -> Style -> Layout -> Paint -> Composite
	
	자바스크립트를 실행한 후 스타일을 계산하고 레이아웃을 실행한다. 하지만 자바스크립트를 사용하여 브라우저가 레이아웃을 일찍 더 수행하도록 하는 것도 가능한다. 이를 **강제 동기식 레이아웃**이라고 한다.


	```javascript
	//프레임 시작 시 특정 DOM의 높이를 기록하는 코드
	
	requestAnimationFrame(logBoxHeight);
	function logBoxHeight() {
	  console.log(box.offsetHeight);
	}
	```
	
	```javascript
	// 높이를 요청하기 전에 상자의 스타일을 변경한 경우 문제가 발생할 여지가 있다.
	
	requestAnimationFrame(logBoxHeight);
	function logBoxHeight() {
	  box.classList.add('super-big');
	  console.log(box.offsetHeight);
	}
	```
	
	두번째와 같이 코드를 짠다면 브라우저는 먼저 스타일 변경을 적용한 후에(class가 추가 되었기 때문에) 레이아웃을 실행해야 한다. (강제 동기식 레이아웃) 그래야 정확한 높이를 반환할 수 있게 된다. 이는 불필요하고 비용이 많이 드는 작업이다.
	
	이런 불필요한 작업을 피하려면 아래와 같이 코드를 수정해야한다. 
	
	```javascript
	requestAnimationFrame(logBoxHeight);
	function logBoxHeight() {
	  console.log(box.offsetHeight);
	
	  box.classList.add('super-big');
	}
	```
	항상 스타일 읽기를 일괄처리 하고 먼저 수행하게 한 다음(이때 브라우저가 이전 프레임 레이아웃 값을 사용할 수 있음) 쓰기 작업을 해야합니다. **(선읽기후쓰기)**

* 레이아웃 Thrashing 피하기

	많은 레이아웃을 연속적으로 빠르게 실행하면 강제 동기식 레이아웃이 더 악화 된다.
	
	```javscript
	function resizeAllParagraphsToMatchBlockWidth() {
	  for (var i = 0; i < paragraphs.length; i++) {
	    paragraphs[i].style.width = box.offsetWidth + 'px'; //reflow 매번 반복
	  }
	}
	```
	
	위의 코드는 각 반복마다 스타일 값을 읽고(box.offsetWidth) 즉시 값을 업데이트 하는 문제가 있다. 해당 문제를 해결하기 위해 아래와 같이 수정한다.
	
	```javscript
	// 읽고
	var width = box.offsetWidth;
	
	function resizeAllParagraphsToMatchBlockWidth() {
	  for (var i = 0; i < paragraphs.length; i++) {
	  	//쓰기, reflow 1번 반복
	    paragraphs[i].style.width = width + 'px';
	  }
	}
	```
	
	또다른 나쁜 예
	
	```javascript
	// Read
	var h1 = element1.clientHeight;
	
	// Write (invalidates layout)
	element1.style.height = (h1 * 2) + 'px';
	
	// Read (triggers layout)
	var h2 = element2.clientHeight;
	
	// Write (invalidates layout)
	element2.style.height = (h2 * 2) + 'px';
	
	// Read (triggers layout)
	var h3 = element3.clientHeight;
	
	// Write (invalidates layout)
	element3.style.height = (h3 * 2) + 'px';
	```
	
	아래와 같이 개선할 수 있다.
	
	```javascript
	// Read
	var h1 = element1.clientHeight;
	var h2 = element2.clientHeight;
	var h3 = element3.clientHeight;
	
	// Write (invalidates layout)
	element1.style.height = (h1 * 2) + 'px';
	element2.style.height = (h2 * 2) + 'px';
	element3.style.height = (h3 * 2) + 'px';
	
	// Document reflows at end of frame
	
	```


* css 적용시 js 표현식 쓰지 않기
* 애니메이션이 들어가는 노드는 전체 노드에서 분리. (postion : absolute, fiexed) 
* DOM 요소에는 미리 사이즈 정하기
* DOM 접근 줄이기 
	* documentFragment 사용
	* cloneNode 사용
	* display : none 사용

* 변경할 부분은 한번에 변경하기

	* 레이아웃 쓰레싱과 일맥상통하는 이야기이다



### 추가

렌더링 과정 중에 style 속성에 따라 별도의 layer(RenderLayer)가 생성되기도 하고, layout 계산(Reflow)이 발생 되기도 한다.


#### Layer란 무엇인가?

변경이 될 요소가 많은 영역을 별도로 관리하여, 해당 영역이 변경되었을 때 그 부분만을 반영하기 위해 브라우저는 Layer를 생성한다. 또한 이렇게 생성된 Layer들은 Layer Composite(레이어 병합)을 통해 paint 또는 layout 계산 없이 새로운 화면을 구성 할 수 있다.

#### 브라우저가 Layer로 구성하는 경우

* 3D(translate3d, preserve-3d, ,..)나 perspective transform을 사용하는 경우
* VIDEO, CANVAS 태그를 사용하는 경우
* Flash나 ActiveX를 사용하는 경우
* CSS Animation, CSS filter를 사용하는 경우
* 자식엘리먼트가 layer로 구성되어 있을 경우
* z-index가 낮은 형제일리먼트가 layer로 구성되어 있을 경우, 대상 엘리먼트도 layer로 구성됨

#### GPU 가속 사용하기

* -webkit-transform : translate3d
* -webkit-transform : translateZ
* -webkit-transform : rotate3d
* -webkit-transform : scale3d
* -webkit-transform-style : preserved-3d

마지막으로 DOM의 위치를 이동시켜야 한다면 left 속성은 translateX로, top 속성은 translateY, filter:fade는 opacity로 수정하자. width, height를 변경하는 경우에는 어쩔수 없이 reflow가 발생되기 때문에 가능하면 사용을 지양하도록 한다.(꼭! 필요하다면 scale을 이용한다.)

참고 : [애니메이션-성능을-높이는-방법](http://sculove.github.io/blog/2013/12/05/애니메이션-성능을-높이는-방법/)