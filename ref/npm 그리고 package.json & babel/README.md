본 포스팅은 Guide 문서가 아니라 제가 공부하고 이해했던 것들을 끄적이는 글 입니다 :D


----------


# 들어가기에 앞서


국내 Front-end 시장에서 Front-end 개발자들이 알아야하는 녀석들이라 함은 Angular2와 React 이 두 녀석들 일 것이다.
물론 js에 대한 이해도는 기본적으로 깔려있다는 전재겠지? 개인적인 의견이니.. 아무튼 Angular2는 GOOGLE에서 만든 Framework이고 React는 Facebook에서 만든 Library이다.
그런데 Framework는 무엇이고 Library는 무엇일까? 사전적인 의미는 다음과 같다.
>**Framework** : *뼈대, 틀*
>
>**Library** :  *도서관, 서재*

사전적 의미를 토대로 내 나름대로 해석해보자면 Framework는 대부분의 기능을 제공해주지만 틀 안에서 작업을 해야하는 녀석이고, Library는 특정 기능만을 제공해주고 (마치 도서관의 책처럼) 나머지 기능을 자유롭게 구현 할 수 있는 녀석인 것 같다. Stackoverflow에서는 어떤 사용자는 이렇게 정의해 놓았다.

>**Framework**
>
> - 기능들이 있으나 추상적인(abstract) 디자인들로 내제 되어있다. 사용을 하기 위해 정해진 형식에 맞게 구현 해야한다.
> - 즉 프레임워크가 작성된 코드를 호출한다.
> - ex) Angular2 , Aurelia, Ember
>
>**Library**
>
> - 본질적으로 사용자가 호출할 수 있는 함수의 집합이며, 요즘은 대게 클래스로 구성된다. 각 호출들은 일부 작업을 수하고 제어권을 사용자에게 반환한다.
> - 즉 사용자가 라이브러리를 호출한다.
> - ex) React, jQuery, Meteor

그 중 나는 Library 중 하나인 React.js를 학습해 보기로 했다.

# npm 그리고 package.json
호기롭게 시작하려 했는데, 부족한 지식이 발목을 잡고 말았다. 기본 환경설정이 무척이나 복잡했다. 그냥 따라하는 것은 어렵지 않지만 각 모듈들이 어떤 부분을 담당하고 무슨 기능을 수행하는지 설명이 부족했다.
우선 [Node.js](https://nodejs.org/ko/) 설치가 되어있어야 했다. 그리고 아래 코드로 프로젝트를 초기화 해야했다.

    $ npm init

여기서 npm이란 무엇일까? npm은 (Node Package Manager)의 약자로 패키지를 관리하는 녀석이다. Node.js 환경에선 모듈을 패키지 형태로 배포하게 되는데 npm을 통해 다른 사람들이 만들어 놓은 모듈(패키지)를 설치하여 사용 할 수 있다.  npm init은 새로운 패키지를 만들겠다는 의미다. npm init을 하게되면 package.json 이라는 파일이 생성된다.

    //------ package.json ------
    {
      "name": "packageTest",    // 필수요소
      "version": "1.0.0",       // 필수요소
      "description": "",        // 패키지 설명
      "main": "index.js",        // 패키지의 시작점
      "scripts": {              // 스크립트 명령어 모음
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",             // 만든 사람
      "license": "ISC"         // 라이센스 형태
    }

package.json은 해당 패키지에 대한 정보가 담겨져 있는 파일이다.
좀 더 자세한 설명은 [모두 알지만 모두 모르는 package.json](http://programmingsummaries.tistory.com/385) 블로그를 참조 하면 된다.

React를 위한 환경설정을 하기 위해 몇가지 npm 명령어를 알아야했다.

    $ npm i 패키지명      // 패키지를 설치 (i == install)
    $ npm un 패키지명     // 패키지를 삭제 (un == uninstall)
    $ npm i 패키지명 -S   // 패키지를 의존 패키지로 설치 (-S == --save)
    $ npm i 패키지명 -D   // 패키지를 개발환경의 의존 패키지로 설치 (-D == --save-dev)

-S 나 -D를 이용하여 패키지를 설치하게 되면 package.json 파일에 변화가 일어나며, 패키지들은 node_modules 폴더에 설치가 된다.

    $ npm i -S react react-dom
    $ npm i -D bable-core

react와 react-dom 패키지를 의존 패키지로 babel-core를 개발 의존 패키지로 설치했다. 그러면 package.json 파일은 아래와 같이 변하게 된다.

    //------ package.json ------
    {
      "name": "packageTest",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {      // -S
        "react": "^15.3.2",
        "react-dom": "^15.3.2"
      },
      "devDependencies": {   // -D
        "babel-core": "6.13.0"
      }
    }
dependencies는 해당 패키지가 동작하기 위해 필요한 의존 패키지 모듈의 목록을 나타낸다. devDependencies는 개발 시에는 필요하지만 실제 release 할 때는 사용되지 않는 패키지 목록을 의미한다. 그런데 babel은 또 뭐야?!


----------

# Babel
Babel은 자바스크립트 컴파일러이다. ([babel 공식 사이트](https://babeljs.io/))
ES6가 공표된지 꽤 시간이 흘렀지만 브라우저가 문법을 따라오지 못하는 경우가 있다. Babel은 ES6 형태로 작성된 문법을 ES5로 변환해 주기도 하며 React의 JSX 문법도 변환해 준다. React와는 별개로 Babel을 사용하기 위해선 아래와 같이 npm 명령어를 사용한다.

    // babel cli 및 preset 설치
    $ npm i babel-cli babel-preset-env -g // -g는 전역 설치를 의미
  babel-cli는 Comand Line에서 babel을 사용할 수 있게하는 interface이고 babel-preset-env는 지원되는 환경에 따라 필요한 Babel 플러그인을 자동으로 결정하는 preset이다. 그 다음 **.babelrc** 파일을 아래와 같이 만든다.

    // .babelrc
    {
      "presets": ["env"]
    }
.babelrc 파일은 아래와 같이 특정 프리셋과 플러그인 들을 설정 해 줄 수 있다.

    {
        "plugins": [
            "transform-decorators-legacy"  // 1번째로 실행됨
        ],
        "presets": [
            "es2015", // 4번째로 실행됨
            "react",  // 3번째로 실행됨
            "stage-1" // 2번째로 실행됨
        ],
    }

아무튼 Babel을 설치했으니 한번 잘 컴파일이 되는지 확인을 해봐아겠다.

    // test.js
    console.log([1,2,3].map(n => n + 1));
  ES6 형태인 문법으로 작성된 test.js 파일을 생성 한 babel-cli를 사용하여 컴파일 해 보았다.

    $ babel test.js
    // 결과
    "use strict";

    console.log([1, 2, 3].map(function (n) {
      return n + 1;
    }));

위와 같이 ES6로 작성된 test.js가 ES5 형태로 변환된 것을 볼 수 있다. 컴파일 된 파일을 따로 저장하고 싶다면 --out-dir( == -d) 명령어를 추가하면 된다.

    $ babel test.js -d 폴더명 // (-d == --out-dir)

다음 포스팅은 webpack과 관련한 내용을 적어 보도록 해야겠다.


----------


P.S. 이외에도 기본 환경 설정에 사용되는 패키지들을 간략하게 정리해보았다.

* Bower

  - npm과 비슷해보이지만 오직 front-end  관련 패키지만 담당하여 관리한다.
  - 단점으로는 의존성 관리가 되지 않고, 설치는 되지만 삭제를 원할 경우 일일히 삭제해줘야 한다.

* Grunt / Gulp

  - 배치 파일을 만들어 놓고 사용하는 자동화 도구이다.
  - Grunt는 배치 파일을 만드는게 어렵고, 2년동안 업데이트가 되지 않는다고 한다.
  - Gulp는 Grunt가 나온 뒤 약 1년 뒤에 나온 녀석인데, 파이프라는 개념으로 순차적으로 minify 해준다고 한다.
  - 현재 Webpack이 Grunt나 Gulp가 수행했던 기능을 대부분 담당하고 있다고 한다

* Browserify / Webpack

  - 작성된 파일들을 한데 묶어주는 bundler이다.
  - common.js의 module 개념을 사용하여 module 형태로 배포하고, require를 통해 사용할 수 있게 해 준다.
  - 빌드를 하게되면 bundle.js 파일로 합쳐진다.
  - module을 bundling 할 때 시작점인 entry point가 필요하다.
  - entry point에 포함되지 않는 녀석들은 bundling을 할 수 없다.
  - Webpack은 Grunt, Gulp의 기능도 지원한다.



