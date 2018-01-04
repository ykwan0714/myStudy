원문 : [Tutorial: How to set up React, Webpack 3, and Babel, in 2017](https://www.valentinog.com/blog/react-webpack-babel/#How_to_set_up_React_Webpack_and_Babel_setting_up_the_project)

# Webpack, Babel, React 시작하기

리액트는 대부분 SPA(Single Page Application)를 만들기 위해 사용됩니다. 그러나 **Webpack과 Babel**를 이용하여 웹사이트에 적용할 수 있습니다.  
대부분의 초보자들이 Webpack과 React를 접목시키는 방법을 모르기에 간단한 튜토리얼을 준비 했습니다.

## 무엇을 배울 수 있나요?

1. Webpack을 설치하고 설정하는 법
2. Babel을 설치하고 설정하는 법
3. React를 설치하는 법
4. 컨테이너 컴포넌트와 프리젠테이션 컴포넌트를 작성하는 법
5. 번들된 파일을 HTML 페이지에 포함하는 법
6. Webpack Dev Server를 설치하고 설정하는 법

## 프로젝트 시작하기

프로젝트를 위한 폴더를 생성합니다.

```sh
$ mkdir webpack-react-tutorial && cd webpack-react-tutorial
```

코드를 저장할 디렉토리도 생성합니다.

```sh
$ mkdir -p src/js
```

프로젝트를 시작하기 위해 초기화 합니다.

```sh
npm init -y
```

이로써 프로젝트 시작 준비가 끝났습니다.


## Webpack 설정하기

**Webpack**은 현대 웹 개발의 중요한 요소 중 하나입니다. 어떤 이들은 싫어할지라도 Webpack은 아주 놀랍고도 강력한 툴입니다.

Bruch가 대안이 될 수 있겠지만, Webpack을 사용할 줄 아는 것은 React 개발의 기본입니다.

Webpack은 대부분의 브라우저들이 이해할 수 있는 자바스크립트 코드를 만들기 위해 개발자가 만든 React 컴포넌트들을 삼켜버릴 것 입니다.

Webpack을 실행하기위해 먼저 설치를 해 봅시다.

```sh
$ npm i webpack --save-dev
```

이제  `package.json` 파일 안에 `webpack`이 추가 되었습니다.

```javascript
"scripts": {
  "build": "webpack"
}
```

Webpack은 실행될 때마다 자동적으로 설정 파일을 참조 합니다.  
`webpack.config.js` 라는 이름을 가진 새로운 파일을 프로젝트 폴더 내부에 생성합니다.

```sh
$ touch webpack.config.js
```

지금은 해당 파일이 비어있지만 다음 섹션에서 의미있는 설정을 추가하겠습니다.

## Babel 설정하기

**리액트 컴포넌트**들은 대부분 **자바스크립트 ES6**로 만들어져 있습니다.  
브라우저들은 리액트 컴포넌트를 이해할 수 없어서 번형이 필요 합니다.

Webpack은 직접 변형을 하지 못하지만 **loader**의 개념은 가지고 있습니다.  
loader를 변압기라고 생각해보세요.

**Webpack loader**는 어떤 입력이 들어오면 출력으로 다른 것을 생성합니다.

`babel-loader`*는 브라우저들이 이해할 수 있게 ES6 코드를 취하는 대표적인 Webpack loader 입니다.  
Babel을 사용할 수 있게 해주는데, Babel은 사전에 설정된 프리셋을 사용하도록 구성해야 합니다. ( 설정이 필요 )

1. **babel-preset-env**는 Javascript ES6코드를 ES5로 컴파일하기 위한 것 입니다. ( 더이상 babel-preset-2015가는 사용되지 않음)
2. **babel-preset-react**는 JSX를 컴파일하기 위한 것입니다.

이제 종속성을 추가해 보겠습니다. 아래 코드를 실행하면 `package.json`에 변화가 생깁니다.

```sh
$ npm i babel-loader babel-core babel-preset-env babel-preset-react --save-dev
```

Babel 설정을 잊지마세요! `.babelrc` 라는 이름을 가진 새로운 파일을 프로젝트 폴더 내부에 생성합니다.

```javascript
//.babelrc
{
  "presets": ["env", "react"]
}
```

여기까지 왔다면 최소한의 Webpack 설정을 만들 준비가 된 것 입니다.
webpack.config.js 파일을 열어 다음과 같이 입력 합니다.

```javascript
// webpack.config.js
const path = require("path");
module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, //js로 끝나는 확장자만 로더를 적용할 것
        exclude: /node_modules/, //node_modules 폴더는 제외
        loader: "babel-loader"
      }
    ]
  }
};
```
아래는 각 속성들이 나타내는 의미입니다.

* entry : 웹팩의 진입점이다. 여러 진입점을 지정할 수 있기에 배열 형태이다. ( 해당 예제에선 ./src/js/app.js )
* output : webpack의 의한 결과물 형식 지정 
 * path : 번들(컴파일의 결과물)의 저장 위치 ( 해당 예제에선 ./dist/js/main.js )
 * filename : 번들로 지정할 이름
* module : 모듈과 관련된 설정
 * rules : 모듈 규칙(로더 구성, parser 옵션 등) 배열 
	  * test : 로더에 적용할 파일을 찾기 위한 정규식
	  * loader : 적용할 로더

**NOTE**: 만약 Webpack에 익숙하지 않다면, [webpack core concepts by Sean Larkin](https://webpack.academy/p/the-core-concepts) 참고

이를 통해 리액트 컴포넌트를 작성할 준비가 되었습니다. 다음 섹션에서 그 방법을 살펴봅시다.

## 리액트 컴포넌트 작성하기

리액트 컴포넌트는 **Container / Presentational** 원칙에 따라 작성해야합니다.  
자세한 사항은 Dan Abramov가 작성한 [container components](https://medium.com/@learnreact/container-components-c0e67432e005), [smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 참조하세요.

Container / Presentational 원칙은 리액트 컴포넌트의 패턴입니다.

**컨테이너 컴포넌트**는 **내부 state**와 **state의 변화를 처리**와 같이 모든 로직을 담당합니다. 

이와 반대로, **프리젠테이션 컴포넌트**는 마크업을 **화면에 표시**하기 위해 사용됩니다.  
프리젠테이션 컴포는트는 대게 **화살표 함수**로 작성하며 컨테이너 컴포넌트로 부터 **props**를 통해 데이터를 받습니다.

이 포스팅의 목적은 단순한 하나의 input text를 가진 React **form**을 만드는 것입니다.

먼저 React를 설치합니다.

```sh
$ npm i react react-dom --save-dev
```

그 다음 컴포넌트를 위한 디렉토리도 생성합니다.

```sh
$ mkdir -p src/js/components/{container,presentational}
```

컨테이너 컴포넌트의 특징은 두가지 입니다.  

* 자신의 state가 존재한다.
* 프리젠테이션 컴포넌트를 포함한다.

이제 컨테이너 컴포넌트를 생성합니다. `src/js/components/container/` 아래에 생성할겁니다.

```sh
$ touch src/js/components/container/FormContainer.js
```

아래와 같이 작성합니다.

```javascript
//formContainer.js

import React, { Component } from "react";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
      </form>
    );
  }
}
export default FormContainer;
```

위 컴포넌트는 현재로썬 아무것도 하지 않습니다. 단지 자식 컴포넌트를 감싸고있는 뼈대죠.
사실 위 와같이 자식요소(Presentational)가 없는 컨테이너 컴포넌트는 쓸일이 없습니다.  
이를 한번 해결해 보죠.

첫번째 프리젠테이션 컴포넌트는 text input 입니다. text input은 아래와 같은 속성이 있습니다.

> * type
> * class
> * id
> * value
> * required

이 모든 속성들은 **props**가 되는데, 컨테이너 컴포넌트가 **props**를 프리젠테이션 컴포넌트로 전달해 줄 것입니다. 자세한 사항은 [Prop Types](https://reactjs.org/docs/typechecking-with-proptypes.html) 참고하세요.

아무튼 prop-types 패키지를 설치합니다.

```javascript
$ npm i prop-types --save-dev
```

프리젠테이션 컴포넌트를 `src/js/components/presentational/` 아래에 생성할겁니다.

```
$ touch src/js/components/presentational/Input.js
```
  
프리젠테이션 컴포넌트는 대체로 화살표 함수를 이용하여 작성한다고 했었죠.

```javascript
//Input.js

import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);
Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default Input;
``` 

자 이제 아까 작성한 컨테이너 컴포넌트를 수정할 준비가 되었습니다. 프리젠테이션 컴포넌트를 사용합니다.

```javascript
//formContainer.js

import React, { Component } from "react";
import Input from "../presentational/Input"; //프리젠테이션 컴포넌트 import

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;
```

이제 마무리 할 시간입니다.  
Webpack은 `webpack.config.js` 파일을 참조하여 엔트리 포인트가 `./src/js/app.js`될 것이라고 예상합니다.

```sh
$ touch src/js/app.js
```

 `./src/js/app.js` 파일을 생성하고 컨테이너 컴포넌트를 사용하기위해 import문을 작성 합니다.
 
```javascript
//app.js

import FormContainer from "./components/container/FormContainer";
```

드디어 실행을 위한 번들된 파일을 생성 할 수 있습니다.

```sh
$ npm run build 
```

번들 파일은 `./dist/js/main.js`에 생성 될 것입니다.  
다만 이 파일은 **실제 배포하기엔 적합하지 않습니다.** 실제론 몇가지 절차가 더 필요합니다. ( 참고 : [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html#webpack) )

이제는 번들 파일을 HTML페이지에 포함시켜 애플리케이션이 어떻게 보이는지 볼 수 있습니다.

## HTML webpack plugin

여태까지 만든 React form을 표시하기 위해 Webpack에게 HTML페이지를 만들어야 한다고 알려줘야합니다. 번들 파일은 `<script></script>` 태그를 사용하여 불러올 것 입니다.

HTML 페이지를 만들기 위해 [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)과 [html-loader](https://webpack.js.org/loaders/html-loader/) 두가지의 컴포넌트가 필요합니다.

종속성을 추가합니다.

```sh
$ npm i html-webpack-plugin html-loader --save-dev
```

그리고나서 `webpack.config.js` 파일을 수정 합니다.

```javascript
//webpack.config.js

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

다음으로 HTML 파일을 `./src/index.html` 만들어 줍니다.

```html
//index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>
<body>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                    <!-- form -->
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

리액트 컴포넌트에게 `<div id="create-article-form">` 안에 들어가야한다고 알려줘야합니다.`./src/js/app.js` 파일을 열어 아래와 같이 수정합니다.

```javascript
//app.js
import React from "react";
import ReactDOM from "react-dom";
import FormContainer from "./components/container/FormContainer";

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
```

이제 아래와 같이 빌드를 한번 더 합니다.

```sh
$ npm run build
```

`.dist/` 폴더를 한번 살펴 보세요. 생성된 HTML 페이지를 볼 수 있습니다.

Webpack을 이용하면  HTML 페이지 안에 javascript 코드를 포함시킬 필요가 없습니다. 번들파일이 자동적으로 페이지 안으로 주입시켜 줍니다.

브라우저로 `./dist/index.html`을 열어보면 React form을 볼 수 있습니다.

## Webpack Dev Server

코드를 수정할 떄마다 `npm run build`를 타이핑 하는 것은 귀찮은 일 입니다.  
개발서버를 구동하면  매번 수정한 파일을 저장할 때마다 자동적으로 브라우저를 새로고침 합니다.  
단 3 줄의 설정만 추가해 주면 **개발 서버**를 실행 할 수 있습니다.

먼저 Webpack Dev Server를 설치합니다.

```sh
$ npm i webpack-dev-server --save-dev
```

`webpack.config.js` 파일 안에 아래의 코드를 추가하여 서버를 구성합니다.

```javascript
//webpack.config.js
...생략...
module.exports = {
	...생략...
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js"
	},
	/* 추가된 코드 시작 */
	devServer: { 
		contentBase: "./dist"
	},
	/* 추가된 코드 끝*/
	...생략...
};
```

`package.json` 파일을 열어 start script를 추가하고 저장합니다.

```javascript
//package.json

"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack"
}
```

이제 실행 합니다.

```sh
$ npm start
```

위의 코드를 입력하면 Webpack이 브라우저에 애플리케이션을 실행하는 것을 볼 수 있습니다.  
Webpack Dev Server는 파일이 수정 될 때마다 자동적으로 새로고침 합니다.
