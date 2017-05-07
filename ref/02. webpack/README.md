[Webpack Tutorial](https://github.com/AriaFallah/WebpackTutorial/edit/master/part1/README.md) 참조하여 나름대로 번역 및 정리해 보았습니다 :D


# 대체 webpack을 왜 사용할까?
---

현실적으로 webpack을 사용하는 이유는 아래와 같다.

 * .js 파일들을 하나로 bundle할 수 있다.
 *  Frontend 코드에 npm 패키지를 사용할 수 있다.
 * babel을 사용하여 ES6/ES7 자바스크립트 코드를 작성할 수 있다.
 * 코드를 Minify하고 Optimize 할 수 있다.
 * LESS나 SCSS를 CSS 형태로 변환할 수 있다.
 * Hot Moudle Replacement(HMR)를 사용할 수 있다.
 * 자바스크립트에 모든 유형의 파일을 포함할 수 있다.
 * 엄청나게 많은 고급 기능들이 있다.

**왜 이러한 기능이 필요할까?**

* js 파일 번들 : 자바스크립트들 모듈 형태로 작성이 가능하다. 때문에 각각의 js 파일에 `<script>` 태그를 사용하지 않아도 된다.
* npm 패키지 사용 : npm은 인터넷상의 가장 큰 오픈 소스 생태계이다. npm을 살펴보면서 작성한 코드를 저장 할 수 있고, 원하는 패키지를 사용할 수 있다.
* ES6와 ES7 : 많은 기능들이 추가되어 보다 쉽고 강력하게 작성하는 것을 도와준다.
* Minify, Optimize : 배포하는 파일의 크기를 줄이는데, 이점으론 빠른 페이지 로드같은 것이 포함된다.
* HMR 사용 : 코드를 저장할 때 마다 전체 페이지를 새로고침 하지 않기 때문에 생산성 향상에 도움이 된다.
* 자바스크립트에 모든 유형 파일 포함 : 다른 빌드 도구의 필요성을 주이고 프로그래밍적으로 해당 파일을 수정, 사용할 수 있다.

## 기본 사항
---
**설치**

webpack의 대부분의 기능을 사용하려면 전역 설치(global)가 필요하다.

```
$ npm i -g webpack
```

그러나 최적화 플러그인과 같은 Webpack의 일부 기능은 아래와 같이 local 설치를 해야한다.

```
$ npm i -D webpack
```

**Command Line**

Webpack을 실행하려면 다음을 실행한다.

```
$ webpack
```

만약 파일이 변경될 때마다 webpack을 빌드하려면 다음과 같이 실행한다.

```
$ webapck --watch
```

## Bundling

![사진1](https://github.com/ykwan0714/myStudy/blob/master/ref/02.%20webpack/01.png)

webpack은 공식적으로 모듈 번들러이다. 동작시키는 방법은 하나의 파일을 진입점(entry point)으로 지정하는 것이다. 진입점이 된 파일은 Tree의 root가 된다. 그러면 매번 `require`에 의해 참조된 다른 파일이 트리에 추가 된다.  그 후 webpack 명령을 실행하면, 모든 파일과 모듈은 하나의 파일에 번들되어 제공된다.

간단한 예제를 보자.

**예제**

![사진2](https://github.com/ykwan0714/myStudy/blob/master/ref/02.%20webpack/02.png)

위의 사진은 아래와 같은 구조를 가지고 있다.

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

그리고 파일의 내용은 아래와 같다.

```javascript
// index.js
require('./styles.css')
require('./UIStuff.js')
require('./APIStuff.js')

// UIStuff.js
var React = require('React')
React.createClass({
 // stuff
})

// APIStuff.js
var fetch = require('fetch') // fetch polyfill
fetch('https://google.com')

/* styles.css */
body {
 background-color: rgb(200, 56, 97);
}
```

여기서 webpack 명령어를 수행하면 이 트리의 내용들은 번들되겠지만 같은 폴더 구조에 있던 `extraFile.js`는 번들에 포함되지 않는다. 왜냐하면 `require`를 사용하여 참조하지 않았기 때문이다.

bundle.js 파일은 아래 처럼 표시될 것이다.

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

즉, 번들로 제공되는 것들은 오직 `require`를 사용하여 참조한 파일들이다.


## Loader

위의 예제에서, Javascript 파일에서 CSS 파일을 `require` 했다.
webpack이 좋은 점은 Javascript 파일 뿐만 아니라 다른 파일들을 참조 할 수 있다는 점이다.
webpack 에는 Loader라는게 존재한다. 이런 Loader들을 사용하면 `require`를 이용하여 `.css` `.html` `.png`등 각종 파일들을 불러올 수 있다.

위의 예제를 다시한번 보자.

```javascript
// index.js
require ( ' ./styles.css ' )
```

만약 [style-loader](https://github.com/webpack/style-loader)와 [css-loader](https://github.com/webpack/css-loader)를 `webpack.config.js`에 포함하게 된다면 실제 페이지에 css를 적용하게 된다. 이런 형태로 더 많은 Loader들을 함께 사용할 수 있다.



## webpack.config.js
---

webpack은 필요에 맞게 환경을 설정해 주어야 작동한다. 이를 위해 `webpack.config.js`라는 파일이 필요하다.

```
webpack.config.js
```

이러한 이름으로 작성되는 이유는 webpack이 기본 적으로 인식하는 이름이기 때문이다. 다른 이름을 사용하려면 --config 플래그를 사용하여 파일이름을 지정해야 한다.

```
webpack --config myconfig.js
```

**예제**

다음과 같은 디렉토리 구조가 있다고 생각하자.

```
MyDirectory
|- dist
|- src
   |- index.js
|- webpack.config.js
```

그럼 우리가 할 수 있는 최소한의 webpack 설정은 아래와 같다.

``` javascript
// webpack.config.js
var path = require('path')

module.exports = {
  entry: ['./src/index'], //파일 확장명이 .js인 경우 선택적으로 생략이 가능하다.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

아래는 각 속성들이 나타내는 의미이다.

* entry : 위의 번들 섹션에서 다뤘던 entry pionint, 즉 진입점이다. 여러 진입점을 지정할 수 있기에 배열 형태이다.
* output : webpack의 의한 결과물 형식 지정
 * path : 번들의 저장 위치
 * filename : 번들로 지정할 이름

위의 코드를 실행하면 `dist` 폴더 아래에 `bundle.js`파일이 생성된다.


## Plugin

플러그인은 Webpack에 추가 기능을 담당한다. 자주 사용되는 플러그인은 스크립트 코드를 minify해주는 `UglifyJsPlugin` 이다. 해당 플러그인을 사용하기 위해 local에 webpack을 설치해야 한다.

```
npm i -D webpack
```

설치가 되었다면 실제로 webpack을 `require`하고 minify할 수 있다.

```javascript
// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    })
  ]
}
```

아래는 새로 추가된 속성에 관한 설명이다.

* plugins : 플러그인을 보유하고 있는 배열
 * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) : 코드를 minify 해주고 경고 메시지를 생략한다.

이제 `webpack`을 실행하면 `UglifyJsPlugin`이 공백 제거와 같은 프로세스를 통해 파일 용량을 줄인다.
또한 [OccurrenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin) 플러그인도 추가할 수 있다.

> **OccurrenceOrderPlugin**
> 발생 횟수별로 모듈과 청크의 id를 할당한다. id는 대게 소문자이며 짧다. 이렇게하면 id가 예측이 가능하게되어 전체파일 크기를 줄일 수 있다.

현재 OccurrenceOrderPlugin은 [webpack2 beta](https://gist.github.com/sokra/27b24881210b56bbaff7) 에는 기본으로 포함되어 있다.

```javascript
// webpack.config.js
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
```

여기까지 자바스크립트의 번들을 압축하는 설정을 작성했다. 이렇게 완성된 `bundle.js`파일은 다른 프로젝트의 `<script>` 태그에 대입할 수 있다.

