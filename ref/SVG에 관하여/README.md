# SVG(Scalable Vector Graphics)

## 시작하기에 앞서

SVG는 2차원 벡터 그래픽을 표현하기 위한 **XML 기반의 파일 형식**이다. SVG 형식의 이미지의 작동은 XML 텍스트 파일들로 정의 되어 검색화, 목록화, 스크립트화가 가능하며 압축화도 가능하다.

SVG 형식의 파일은 Adobe 일러스트레이터와 같은 벡터 드로잉 프로그램을 사용하여 편집이 가능하다. 물론 XML 형식으로 되어 있으므로 메모장과 같은 문서 편집기로도 편집이 가능하다.

현재 마이크로소프트의 IE 8 및 이전 버전을 제외한 대부분의 주요 웹 브라우저들은 SVG를 지원한다. IE8 및 이전 버전에서는 SVG 파일을 보기 위해 별도의 플러그인을 수동으로 설치하여야 하며, 그렇지 않은 경우에는 웹 페이지 제작자가 SVG Web(구글 코드에서 개발중인)과 같은 라이브러리를 웹 페이지 코드에 포함시켜야 한다.

> 참고: [SVG 지원 현황](http://caniuse.com/svg)

경쟁 기술인 [HTML5 캔버스](https://developer.mozilla.org/ko/HTML/Canvas)나 (애플리케이션 인터페이스로서) Adobe 플래시보다 느린 편이다. 다만 SVG는 [DOM 인터페이스](https://developer.mozilla.org/ko/docs/Web/API)를 사용할 수 있는 점과 서드파티 확장을 필요로 하지 않는 이점을 가지고 있다. SVG를 활용할 지는 사용자의 목적에 달려있다.

SVG를 시작하기에 앞서, 기초적인 XML 문법이나 HTML 같은 다른 마크업 언어를 이해할 필요가 있다. XML에 익숙하지 않다면 다음 사항들을 유념하기 바란다.

* XML은 HTML과 달리 대소문자를 구분하는 언어이므로 SVG 요소와 속성은 반드시 예제에 보이는 대로 입력해야 한다.
* SVG에서 속성 값은 숫자라고 할지라도 반드시 따옴표로 둘러싸야 한다.

## 시작하기 

### 간단한 예제

간단한 SVG 문서는 `<svg>` 루트 엘리먼트와 그래픽을 구성하기 위한 몇가지 기본 도형들로 구성된다.

```xml
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="red" />
  <circle cx="150" cy="100" r="80" fill="green" />
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
</svg>
```

코드를 복사하여 demo1.svg로 저장하고, 브라우저에서 실행해 보자. 아래와 같은 화면이 그려질 것이다. [결과링크](http://developer.mozilla.org/@api/deki/files/4571/=svgdemo1.xml)

![image](https://developer.mozilla.org/@api/deki/files/4928/=svgdemo1.png)

화면이 그려지는 과정은 다음과 같다.

1. SVG 루트 요소(Element)부터 시작
	* DTD 기반의 SVG유효성 검사는 많은 문제를 야기하기 때문에 (X)HTML로 알려진 `doctype` 선언은 사용하지 않는다.
	* 다른 유형의 유효성 검사를 위해 SVG버전을 식별하려면 항상 `version`과 `baseProfile` 속성을 사용해야 한다.
 	* XML 특수언어(dialect)로서 SVG는 `xmlsn` 속성에서 항상 네임 스페이스(namespace)를 올바르게 바인딩해야 한다. 자세한 내용은 [네임스페이스 충돌 과정 페이지](https://developer.mozilla.org/en/docs/Web/SVG/Namespaces_Crash_Course)를 참조
2. 전체 이미지 영역을 포함하는 사각형 `<rect />`을 그려 배경을 빨간색(`fill`)으로 설정.
3. 빨간색 직사각형의 중앙(`cx`, `cy`)에 반경(`r`) 80px의 녹색 원 `<circle />`이 그려진다.
4. 텍스트 "SVG"가 그려진다. 각 문자의 내부는 흰색으로 채워진다. 텍스트는 중심점이 되고자 하는 지점에 앵커를 설정하여 배치한다. 이 경우 중심점은 녹색 원의 중심(`x`)에 일치해야한다. 글꼴 크기(`font-size`)와 수직 위치(`y`)를 미세 조정하여 최종 결과를 확인할 수 있다.

### SVG 파일의 기본 속성

* 가장 먼저 주목해야할 것은 엘리먼트를 렌더링하는 순서이다. 나중에 위치한 엘리먼트가 이전 엘리먼트 위에 렌더링 된다는 점이다. 따라서 아래에 위치한 엘리먼트가 더 잘보인다.
* 웹의 SVG 파일은 브라우저에 직접 표시되거나 HTML 파일에 여러가지 방ㅇ법을 통해 포함될 수 있다.
	* HTML이 XHTML이고 application/xhtml+xml 유형으로 제공되는 경우 SVG는 XML 소스에 직접 포함될 수 있다.
	* HTML이 HTML5이고 브라우저가 HTML5 브라우저를 준수하는 경우 SVG를 직접 삽입 할 수 있다. 그러나 HTML5 사양을 준수하는 데 필요한 구문 변경이 있을 수 있다.
	* SVG 파일은 object 요소로 참조 할 수 있다:

		```html
		<object data="image.svg" type="image/svg+xml" />
		```
		
	* 마찬가지로 iframe 요소로 사용할 수 있다:

		```html
		<iframe src="image.svg"></iframe>
		```
	 
	* 이론적으로, img 요소로 사용할 수 있으나 4.0 이전의 Firefox에서는 작동하지 않는다.
	* 마지막으로 SVG는 JavaScript로 동적으로 생성되어 HTML DOM에 삽입 될 수 있다. 이는 SVG를 처리할 수 없는 브라우저에서 대체하여 구현할 수 있다는 장점이 있다.

### SVG 파일 형식

SVG 파일은 두 가지 형태로 제공된다.

* .svg: SVG 마크업이 포함 된 간단한 텍스트 파일
* .svgz: 지도 같은 일부 응용 프로그램에 매우 큰 크기의 SVG 파일이 있기 떄문에 gzip으로 압축된 SVG 파일을 허용한다. 그러나 SVG 파일을 Microsoft IIS 서버에서 서비스 할 때 모든 SVG 가능 브라우저(사용자 에이전트)에서 안정적으로 작동하게 하려면 문제가 있다. 그리고 Firefox는 로컬 컴퓨터에서 gzip으로 압축 된 SVG를 로드 할 수 없다. 웹 서버에 게시 할 때를 제외하고는 gzip으로 압축 된 SVG를 사용을 하지 말 것 (아래 참조).

### 웹서버 업로드

SVG 파일을 웹서버에 업로드하는 단계에는 몇 가지 문제점이 있다. 보통, SVG 파일의 경우 서버는 다음과 같이 HTTP 헤더를 보내야 한다.

```
Content-Type: image/svg+xml
Vary: Accept-Encoding
```

gzip으로 압축 된 SVG 파일의 경우, 서버는 다음과 같이 HTTP 헤더를 보내야 한다.

```
Content-Type: image/svg+xml
Content-Encoding: gzip
Vary: Accept-Encoding
```

네트워크 모니터 패널이나 [web-sniffer.net](http://web-sniffer.net/)과 같은 사이트를 사용하여 서버가 SVG 파일과 함께 올바른 HTTP 헤더를 보내고 있는지 확인할 수 있다. SVG 파일 중 하나의 URL을 전송하고 HTTP 응답 헤더를 확인해 보라. 서버가 위의 값으로 헤더를 보내지 않으면 웹 호스트에 문의해야한다. 다양한 간단한 해결 방법은 [w3.org](https://www.w3.org/services/svg-server/)의 서버 구성 페이지를 참조하십시오.

SVG를 사용하는데 있어 서버 구성 오류가 SVG로드에 실패하는 가장 일반적인 이유이기에 확인해야한다. 서버가 SVG 파일을 제공하면서 올바른 헤더를 보내도록 설정되어 있지 않다면 Firefox는 SVG파일의 마크업을 텍스트 또는 인코딩된 의미없는 값으로 표시하거나 뷰어에게 열어 볼 응용 프로그램을 선택하도록 요청할 가능성이 크다.

## 위치

### 그리드

![image](https://developer.mozilla.org/@api/deki/files/78/=Canvas_default_grid.png)

모든 요소(Element)에 대해 SVG는 그리드 시스템을 사용한다. 문서의 왼쪽 위 모서리는 (0,0)으로 간주되며 한 지점의 위치는 왼쪽 상단 모서리에서 픽셀 단위로 표시되고 X축의 양의 방향은 오른쪽, Y축의 양의 방향은 아래쪽으로 향한다.이것은 HTML의 요소가 배치되는 것과는 같은 방법이다.

#### 예제 :

```html
<rect x="0" y="0" width="100" height="100" />
```

위의 요소는 왼쪽 상단에서 가로 100px 세로 100px의 정사각형을 의미한다.

### 픽셀이란 

기본적으로 SVG 문서에서 1픽셀은 출력 장치(화면)의 1픽셀에 매핑된다. 

별도의 단위 식별자(ex: "cm", "px") 없이 숫자만을 사용하면 사용자 단위와 화면 단위는 1:1의 비율로 동작한다. SVG에는 이 비율을 변경하기 위한 몇가지 방법이 있습니다.

```html
<svg width="100" height="100">
```

위 요소는 100x100px 의 SVG 캔버스를 정의합니다. 사용자 단위와 화면 단위는 1:1의 비율로 동작한다.

```html
<svg width="200" height="200" viewBox="0 0 100 100">
```

위 요소는 SVG 캔버스 전체 크기가 200x200 픽셀이다. 그러나 viewBox속성을 사용하여 (0,0)에서 시작하는 100x100px의 화면을 200x200px의 화면에 출력합니다. 이렇게하면 100x100 단위 영역을 효과적으로 확대하고 이미지를 두 배 크기로 확대 할 수 있다.

## 기본 형태

![image](https://developer.mozilla.org/@api/deki/files/359/=Shapes.png)

```html
<?xml version="1.0" standalone="no"?>
<svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">

  <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>

  <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
  <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>

  <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"/>
  <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
      stroke="orange" fill="transparent" stroke-width="5"/>

  <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
      stroke="green" fill="transparent" stroke-width="5"/>

  <path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```

### Rect

[rect](https://developer.mozilla.org/en-US/Web/SVG/Element/rect) 요소는 화면에 사각형을 그린다. 아래 예제에는 화면상에서 사각형의 위치와 모양을 제어하는 6가지 기본 속성아 있다. 앞서 보여준 이미지는 두 개의 rect 요소를 보여주며 약간 중복된다. 오른쪽에 있는 이미지는 rx와 ry 속성이 설정되어 있어서 모서리가 둥글다. rx와 ry가 설정되지 않은 경우에는 기본값 0으로 들어간다.

```html
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```
> x: 사각형 왼쪽 위 모서리의 x위치   
> y: 사각형 왼쪽 위 모서리의 y위치   
> width: 사각형의 폭   
> height: 사각형의 높이   
> rx: 사각형 모서리의 x 반경   
> ry: 사각형 모서리의 y 반경

### Circle

[circle](https://developer.mozilla.org/en-US/Web/SVG/Element/circle) 요소는 화면에 원을 그린다.

> r: 원의 반지름   
> cx: 원의 중심의 x의 위치  
> cy: 원의 중심의 y의 위치

```html
<circle cx="25" cy="75" r="20"/>
``` 

### Ellipse

[ellipse](https://developer.mozilla.org/en-US/Web/SVG/Element/ellipse)는 원의 x와 y의 반지름을 개별적으로 확장할 수 있는 타원을 화면에 그린다.

```html
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

> rx: 타원의 x 반경  
> ry: 타원의 y 반경
> cx: 타원의 중심의 x 위치
> cy: 타원의 중심의 y 위치

### Line

[line](https://developer.mozilla.org/en-US/Web/SVG/Element/line) 직선이다. line 요소는 선의 시작과 끝 지점을 지정하는 두 점을 속성으로 갖는다.

```html
<line x1="10" x2="50" y1="110" y2="150"/>
```

> x1: 첫 점의 x 위치   
> y1: 첫 점의 y 위치   
> x2: 두번째 점의 x 위치   
> y2: 두번쨰 점의 y 위치   

### Polyline

[polyline](https://developer.mozilla.org/en-US/Web/SVG/Element/polyline)은 연결된 직선들의 그룹이다. 직선들은 꽤 길어질 수 있기 때문에 모든 포인트가 하나의 속성에 포함된다.

```html
<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
```

> points: 포인트들의 목록, 각 숫자는 공백, 쉼표, EOL 또는 줄 바꿈 문자로 구분된다. 각 포인트는 반드시 x 좌표와 y 좌표를 가지고 있어야 한다. 따라서 포인트 목록 (0,0), (1,1) 및 (2,2)는 "0 0, 1 1, 2 2"라고 쓸 수 있다.

### Polygon

[polygon](https://developer.mozilla.org/en-US/Web/SVG/Element/polygon)은 점을 연결하는 직선으로 구성된다는 점에서 polyline과 매우 유사하다. 하지만 다각형의 경우, 자동으로 마지막 포인트로부터 첫 번째 포인트로 직선을 만들어서 닫힌 모양을 만든다. 사각형은 다각형의 하나이므로, 융통성있는 사각형을 필요로 하는 경우 polygon 요소를 사용해서 rect 요소를 만들 수 있다.

```html
<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>
```

> points: 포인트들의 목록, 각 숫자는 공백, 쉼표, EOL 또는 줄 바꿈 문자로 구분된다. 각 포인트는 반드시 x 좌표와 y 좌표를 가지고 있어야 한다. 따라서 포인트 목록 (0,0), (1,1) 및 (2,2)는 "0 0, 1 1, 2 2"라고 쓸 수 있다. 그러면 (2,2)에서 (0,0)으로 최종 직선이 그려져서 다각형이 완성된다.

### Path

[path](https://developer.mozilla.org/en-US/Web/SVG/Element/path)는 아마 SVG에서 사용할 수 있는 가장 일반적인 형태일 것이다. path 요소를 사용해서 사각형(둥근 모서리가 있거나 없는), 원, 타원, 폴리라인 및 다각형을 그릴 수 있다. 기본적으로 다른 모든 종류의 모양, 베지에 곡선, 2차원 곡선 등이 가능하다. 그러한 이유로, paths 는 튜토리얼의 the next section 에 들어가지만, 지금은 모양을 제어하는 데 사용되는 단일 속성이 있음을 알려주겠다.

```html
<path d="M 20 230 Q 40 205, 50 230 T 90230"/>
```

> d: 경로를 그리는 방법에 대한 포인트 및 기타 정보 목록입니다. 자세한 내용은 [Path 섹션](https://developer.mozilla.org/en-US/Web/SVG/Tutorial/Paths)을 참조.

## Path

<path> 엘리먼트는 SVG 기본 도형 라이브러리에서 가장 강력한 엘리먼트이다. 선과 곡선, 호 등 다양한 형태를 그릴 수 있다.

패스의 모양은 d 속성 하나로 정의된다. "d" 속성은 여러 개의 명령어와 그 파라미터들로 이루어진다.

각각 명령은 특정 알파벳으로 시작한다. 예를 들면 현재 그려지는 위치를 XY 좌표계의 (10, 10)으로 이동할 때 "Move To" 명령을 사용하게 되는데, 이 명령은 알파벳 M으로 호출한다. SVG 처리기가 이 문자를 읽게 되면 다른 위치로 이동하라는 명령으로 이해하게 된다. 즉, (10, 10)으로 이동하려면 명령어 "M 10 10"을 쓰면 된다. 이후에 처리기는 다음 명령어를 읽기 시작한다.

모든 명령어는 2가지 변형이 존재하는데, 알파벳이 대문자일 경우(예를 들면 대문자 M), 뒤따르는 좌표는 페이지의 절대 좌표를 참조하며, 소문자 알파벳(m)일 경우 마지막 위치에 대한 상대적 좌표로 참조된다.

"d" 속성의 좌표는 **단위**가 붙지 않으며, 패스의 위치나 형태가 어떻게 변형될 수 있는지는 나중에 배우도록 한다.

### Line 명령어

<path> 노드에는 다섯 개의 선 명령어가 있다. 

#### 1. 'Move To(이동하기)' 혹은 'M'

이 명령어는 두 개의 파라미터로 x와 y 좌표를 받는다. 그리기 커서가 이미 페이지의 다른 곳에 있었더라도 두 점 사이에 점이 그려지지는 않는다. 'Move To' 명령어는 다음과 같이 패스의 맨 처음에 와서 그리기를 시작할 위치를 지정한다:

```
M x y (혹은 m dx dy)
```

아래의 예제에서는 좌표 10,10)에 점을 찍었다.(circle) 일반적으로 패스를 그릴 때는 이 점이 나타나지 않는다는 점에 주의해야 한다.

![image](https://developer.mozilla.org/@api/deki/files/45/=Blank_Path_Area.png)

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">

  <path d="M10 10"/>

  <!-- 점 -->
  <circle cx="10" cy="10" r="2" fill="red"/>

</svg>
```

### 2. 'Line To(선그리기)' 혹은 'L'

L 명령어는 x, y라는 두 개의 파라미터를 받아서 현재 위치에서 새 위치로 선을 긋는다.

```
L x y (혹은 l dx dy)
```

### 3. 가로선과 세로선 

가로선과 세로선을 그리는 축약 명령어도 있다. 'H'는 가로선을 그리고, 'V'는 세로선을 그릴 수 있다. 두 명령어는 한 좌표축으로만 이동하므로 하나의 파라미터만을 받는다.

```
H x (혹은 h dx)
 V y (혹은 v dy)
```

도형 그리기부터 시작해 보자. 사각형을 그려볼 텐데(<rect>를 이용해 쉽게 그릴 수도 있다), 시작점부터 가로, 세로선도 함께 사용되었다.

![image](https://developer.mozilla.org/@api/deki/files/292/=Path_Line_Commands.png)

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  
  <path d="M10 10 H 90 V 90 H 10 L 10 10"/>

  <!-- 점 -->
  <circle cx="10" cy="10" r="2" fill="red"/>
  <circle cx="90" cy="90" r="2" fill="red"/>
  <circle cx="90" cy="10" r="2" fill="red"/>
  <circle cx="10" cy="90" r="2" fill="red"/>

</svg>
```

### 4. 'Close Path(도형 닫기)' 혹은 'Z'

'Z'라는 명령어를 통해 쉽게 도형을 마무리할 수 있다. 이 명령어는 현 위치에서 시작점으로 직선을 그린다. **항상은 아니지만** 패스의 끝에 자주 쓰인다. 대문자와 소문자 사이의 차이는 없다.

```
Z (혹은 z)
```

위 코드를 짧게 줄여보면:

```html
<path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
```

위의 형태를 아래처럼 상대 좌표로도 표현해볼 수 있다. 상대좌표 명령어는 앞서 기술된 바와 같이 소문자로 되어 있는 명령어인데, 패스를 움직일 때 정확한 위치를 지정해주는 것이 아니라 현재 위치로부터 얼마나 움직여야 하는지를 기술해준다. 예를 들면 위 80x80 상자를 아래와 같이 표현할 수 있다.

```html
<path d="M10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
```

여기서 패스는 (10,10)에서 시작하여 수평으로 80포인트만큼 오른쪽으로 움직이고 수직으로 80포인트만큼 아래로 이동하고 다시 시작점으로 이동하게 된다.

위 예제의 모양을 만드는 데는 <polygon> 태그나 <polyline> 태그가 더 간편해보일 수 있지만, 패스는 SVG를 그릴 때 자주 사용되므로 개발자 입장에서 더 편할 수도 있다. 성능 면에서는 둘 모두 비슷비슷하니, 편한 것으로 사용하자.

## 참고문헌

* [위키백과: 스케일러블 벡터 그래픽스](https://ko.wikipedia.org/wiki/%EC%8A%A4%EC%BC%80%EC%9D%BC%EB%9F%AC%EB%B8%94_%EB%B2%A1%ED%84%B0_%EA%B7%B8%EB%9E%98%ED%94%BD%EC%8A%A4)
* [MDN web docs: SVG 튜토리얼](https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial)

## EX

[https://codepen.io/ykwan0714/pen/KRGYGX](https://codepen.io/ykwan0714/pen/KRGYGX)