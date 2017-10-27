## React Native


### 1. Reacti Native란 무엇인가?

네이티브 웹 애플리케이션을 빌드하게 도와주는 UI라이브러리

* html, css를 사용하는 애플리케이션을 생성하지 않는다. (Apach Cordova, Iconic과의 차이점)
* 컴파일 단계에서 네이티브 코드(Objective-C/Java)로 실행이 된다.
* 따라서 iOS/Android에 둘 다 적용할 수 있다.

참고 : [리액트 네이티브로 날씨앱 만들기 #4 What is React Native](https://youtu.be/w9MI96KKKlg)

### 2. React Native Basic Concpets

[React Native Components](https://facebook.github.io/react-native/docs/components-and-apis.html)

* 더 이상 html markup이 존재하지 않고 컴포넌트가 존재한다.
* 컴포넌트는 모바일 환경에 따라 네이티브하게 변한다.
* 레이아웃을 flexbox를 이용해 만들 수 있다. 

	```javascript
	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#fff',
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
	});
	
	...생략...
	
	<View style ={styles.container}> ..
	
	```

참고 : [리액트 네이티브로 날씨앱 만들기 #7 Basic React Native Concepts](https://youtu.be/C47byD8CzAw)


### 3. Flexbox를 이용하여 Layout 구성하기


참고 : [리액트 네이티브로 날씨앱 만들기 #8 React Native Layouts with Flexbox](https://youtu.be/Qb2a1uFSMvY)

참고 : [리액트 네이티브로 날씨앱 만들기 #9 Building the Loading View](https://youtu.be/2y_G4iVmGMI)

참고 : [리액트 네이티브로 날씨앱 만들기 #10 Building the Weather View](https://youtu.be/LfbHU00A-zk)

참고 : [리액트 네이티브로 날씨앱 만들기 #12 Getting the Geolocation](https://youtu.be/a15UBCamwKQ)

참고 : [리액트 네이티브로 날씨앱 만들기 #15 Hooking the Weather : Component to the weather data](https://youtu.be/Ql_yEkMxpQI)

## Expo

### 1. Expo란 무엇인가?

[Expo 공식 홈페이지](https://expo.io)

리액트 네이티브를 이용해 애플리케이션을 만드는 것을 도와준다.

* xcode나 Android Stuido를 이용하지 않아도 된다.
* Expo Client를 이용하여 모바일 환경에서 테스트가 가능하다.
* 복잡한 업데이트 프로세스를 거치지 않고 개발자가 배포 시 자동 반영이 된다.

참고 : [리액트 네이티브로 날씨앱 만들기 #5 What is Expo](https://youtu.be/bXWV0obzggM)

### 2. Expo 설치 및 새로운 프로젝트 생성

* 프로젝트를 생성하고 실행되는 Simulator는 xcode / Android SDK가 설치되어 있어야 사용이 가능하다.
* Share 버튼 클릭 시 표시되는 QR 코드를 모바일의 Expo Client를 통해 인식하면 실행할 수 있다.

참고 : [리액트 네이티브로 날씨앱 만들기 #6 Installing Expo and Creating a new Project](https://youtu.be/2p59H_J6ZaM)



#### cc. CSS flex


| container 요소 | item 요소 |  
|---:|---:|
| display | order |
| flex-dircetion | flex-grow |
| flex-wrap | flex-shrink |
| flex-flow | flex-basis |
| justify-content | flex |
| align-items | align-self |
| align-content | |

참고 : [생활코딩 flex](https://opentutorials.org/course/2418/13526)

