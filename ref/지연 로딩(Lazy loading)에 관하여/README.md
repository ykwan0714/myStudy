> 이 포스팅은 원문([
Lazy Loading Images and Video](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/?utm_source=CSS-Weekly&utm_campaign=Issue-310&utm_medium=email))을 번역한 글 입니다. 이해가 어려우신 부분은 원문을 참고해주세요.

## 지연 로딩(Lazy loading)이란?

**지연 로딩**은 페이지 로드 시 중요하지 않은 리소스 로딩을 지연시키는 기술이다. 대신 이러한 리소스는 필요할 때 로드 된다. 이미지에서 중요하지 않은 리소스는 때때로 `off-screen`과 동의어이다..Lighthouse를 사용하고 사용성 검토해 본 적이 있다면, [Offscreen Images 감사](https://developers.google.com/web/tools/lighthouse/audits/offscreen-images)의 형태로 이 영역에 대한 몇가지 지침을 확인해 보았을 것이다.



**사진 1.** Lighthouse의 성능 감사 중 하나는 지연 로딩이 될 화면 이미지를 식별하는 것이다.  
아마 이미 지연 로딩을 보았을 것이다.

* 페이지의 내용을 읽을 때 스크롤을 시작한다.
* 어떤 시점에서 placeholder 이미지 영역으로 스크롤 한다.
* placeholder 이미지가 갑자기 최종 이미지로 변환 된다.

이미지 지연 로딩의 예시는 인기 있는 게시 플랫폼 매체 [Medium](https://medium.com/)에서 볼 수 있다. Medium에서는 페이지 로드 시 저용량의 placeholder 이미지를 먼저 로드하고, 사용자가 해당 이미지로 스크롤 했을 때 최종 이미지로 대체한다.



**사진 2.** 이미지 지연 로드의 예시. Medium에서는 페이지 로드 시 저용량의 placeholder 이미지를 먼저 로드하고(왼쪽), 사용자가 해당 이미지로 스크롤 했을 때 필요에 따라 최종 이미지가 로딩 된다.(오른쪽)

지연 로딩에 익숙하지 않다면 이게 얼마나 유용하고 이점이 무엇인지 궁금할 것이다. 읽으면서 알아 보자!


## 이미지/비디오를 그냥 로딩하는 대신 지연 로딩을 사용하는 이유?

사용자가 볼 수 없는 것들을 로딩할 가능성이 있기 때문이다. 이는 몇가지 이유로 인해 문제가 된다.

* 사용자가 볼수 없는 것들을 로딩할 경우 데이터가 낭비된다. 무제한 요금제에서는 문제가 될 만한 상황이 아니다. (사용자가 실제로 볼 수 있는 다른 리소스를 다운로드하는 데 대역폭을 사용할 수도 있음) 그러나 제한된 요금제에서는 사용자가 볼 수 없는 것을 로딩하는 것은 돈 낭비가 될 수 있다.
* 처리 시간, 배터리 및 기타 시스템 리소르를 낭비한다. 미디어 리소스를 다운로드 한 후 브라우저는 이를 디코딩하여 화면에 렌더링 해야한다.

이미지 및 동영상 로딩을 지연시킬 경우 초기 페이지 로드 시간 및 시스템 리소스 사용량이 줄어들어 성능에 긍정적인 영향을 끼친다. 이 가이드에서는 몇 가지 기술을 다루고 이미지 및 비디오 지연 로딩에 대한 지침과 [일반적으로 사용되는 라이브러리의 간단한 목록](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries)을 제공한다.

## 이미지 지연 로딩

이미지 지연 로딩 메커니즘은 이론상 단순하지만 세부 사항은 약간 까다롭다. 추가로 두가지 사용 사례가 있는데, 둘 다 지연 로딩에서 이점을 보인다. 첫번째로, HTML의 인라인 이미지로 지연 로딩을 시작해본다.

### 인라인 이미지

가장 일반적인 지연 로딩 후보는 `<img>` 태그 요소에 사용 된 이미지이다. 우리가 <img> 태그 요소를 지연 로딩 할 경우, 자바스크립트를 사용하여 화면에 표시되고 있는지 확인한다. 존재하는 경우, `src(때로는 srcset)` 속성에 원하는 이미지 URL을 채워 넣는다.

### 교차 관찰자(Intersection observer) 사용

위처럼 지연 로딩 코드를 작성 한 경우 `scroll` 또는 `resize`와 같은 이벤트 핸들러를 사용하여 작업을 수행했을 것이다. 이 접근법은 여러 브라우저에서 호환되지만, 최신 브라우저는 [교차 관찰자 API](https://developers.google.com/web/updates/2016/04/intersectionobserver)를 통해 요소가 화면에 표시되는 것을 검사하는 작업을 보다 효율적이고 수행 할 수 있다.

> 참고: 일부 브라우저에서는 교차 관찰자가 지원되지 않는다. 브라우저 간의 호환성이 중요한 경우 [다음 섹션](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/?utm_source=CSS-Weekly&utm_campaign=Issue-310&utm_medium=email#using_event_handlers_the_most_compatible_way)을 참고하라. 해당 섹션에서는 성능은 떨어지지만 호환성은 더 높은 scroll, resize 이벤트 핸들러를 사용하여 이미지를 로드하는 방법을 보여 준다.

교차 이벤트 관찰자는 요소가 화면에 표시하는 것을 계산하는 코드를 작성하는 대신 관찰자를 등록하기만하면 되기 때문에 다양한 이벤트 핸들러에 의존하는 코드보다 사용하고 읽는 것이 더 쉽다. 개발자가 해야 할 일은 요소가 화면에 나타날 때 수행 할 작업을 결정하는 것이다. 지연 로딩 된 <img> 요소에 대한 기본 마크업 패턴을 가정해보자.

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="I'm an image!">
```

우리는 이 마크업에서 3가지 사항에 집중할 것이다.

1. `class` 속성은 자바스크립트에서 요소를 선택할 때 사용한다.
2. `src` 속성은 페이지가 처음 로드될 떄 표시될 placeholder 이미지 url을 참조한다.
3. `data-src` 및 `data-srcset` 요소는 이미지가 화면 상에 나타날때 표시할 실제 이미지 url을 담고 있는 placeholder 속성이다.

이제 이 마크업을 이용하여 JavaScript에서 교차 관찰자를 통해 이미지를 지연 로딩하는 방법을 살펴 본다.

```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

document의 `DOMContentLoaded` 이벤트에서 DOM에 `<img>` 태그이면서 `lazy` 클래스가 있는 모든 요소를 쿼리한다. 교차 관찰자(IntersectionObserver)를 사용할 수 있는 경우 `img.lazy` 요소가 화면에 나타날 때 콜백을 실행하는 새 관찰자를 생성한다. [CodePen 예제](https://codepen.io/malchata/pen/YeMyrQ)를 통해 동작을 확인할 수 있다.

> 참고: 이 코드는 isIntersecting라고 명명된 교차 관찰자 메소드를 통해 구현하였으나, IE Edge 15버전의 교차 관찰자 구현에서는 사용할 수 없다. 따라서 위의 지연 로딩 코드(및 다른 유사한 코드 조각)는 실패한다. 보다 완벽한 기능 감지 조건에 대한 안내는 [이 GitHub 이슈](https://github.com/w3c/IntersectionObserver/issues/211) 를 참조하라.

그러나 교차 관찰자의 단점은 [브라우저 간에 좋은 지원을 제공](https://caniuse.com/#feat=intersectionobserver)하지만 보편적이지 않다는 점입니다. 지원하지 않는 브라우저를 위해 위의 코드에서 [폴리필이 필요](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)하고, 사용 가능 여부를 검색한 후 이전의 호환되는 방법으로 돌아가야한다.

### 이벤트 핸들러 사용 (가장 호환성이 높은 방법)

지연 로딩을 위해 교차 관찰자 사용하게 되면 애플케이션의 요구 사항은 브라우저 호환성이 중요할 것이다. 이 때문에 [교차 관찰자 polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)를 적용할 수 있다.(가장 쉬운 방법) 하지만 화면에 요소가 표시하는것을 판단하기 위해 [getBoundingClientRect](getBoundingClientRect)와 함께 [scroll](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)과 [resize](https://developer.mozilla.org/en-US/docs/Web/Events/resize), [orientationchange](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange) 이벤트 핸들러 사용하는 방식으로 되돌아 가야한다.

이전과 같은 마크업을 사용하면 다음 코드가 지연 로딩 기능을 제공한다.

```js
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

이 코드는 `scroll` 이벤트에서 `img.lazy` 엘리먼트가 화면에 표시되는 지 확인하기 위해 `getBoundingClientRect`를 사용한다. `setTimeout`은 지연 처리를 하기 위해 호출되며 `active` 변수는 함수 호출을 조절하기 위해 사용한다. 이미지가 지연 로딩되면 엘리먼트 배열에서 제거된다. 엘리먼트의 길이가 0이 되면 스크롤 이벤트를 제거한다. [CodePen 예제](https://codepen.io/malchata/pen/mXoZGx)를 통해 동작을 확인할 수 있다.

이 코드는 대부분의 브라우저에서 작동하지만, 반복적인 setTimeout 호출 때문에 잠재적인 성능 문제가 있다. 이 예제에서는 이미지가 화면에 표시되고 있는지 여부에 관계없이 스크롤 또는 창 크기 조정시 200밀리초마다 확인을 한다.또한, 얼마나 많은 요소가 지연 로딩 되고 스크롤 이벤트 핸들러의 바인딩이 해제되는지 추적하는 지루한 작업은 개발자에게 맡긴다.

결론: 가능하면 교차 관찰자를 사용하고 광범위한 호환성이 중요한 애플리케이션인 경우 이벤트 핸들러를 사용하여 구현하라.


### CSS 안의 이미지

`<img>` 태그는 웹 페이지에서 이미지를 사용하는 가장 일반적인 방법이지만 CSS `background-image` 속성 (및 기타 속성)을 통해 이미지를 호출 할 수도 있다 . `<img>` 엘리먼트는 화면에 표시 되는 것과 관계없이 로드되는 요소지만, CSS의 이미지 로딩은 더 많은 추측을 통해 수행된다. [document와 CSS 객체 모델](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)과 [렌더 트리](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)가 내장되어, 브라우저는 CSS는 외부 리소스를 요청하기 전에 문서에 적용되는 방법을 살펴본다. 외부 리소스와 관련된 CSS 규칙이 현재 문서에 적용되지 않는다고 판단하면 브라우저는 요청하지 않는다.

이러한 추측적 행동은 JavaScript를 사용하여 요소가 화면에 표시되고 있는지 확인한 다음, CSS에서 배경 이미지를 호출하는 스타일이 적용된 클래스 요소에 따라 로딩 지연에 사용된다. 이로 인해 필요할 때 이미지가 다운로드 된다. 예를 들어, 큰 이미지가 포함 된 요소를 가져와 보자.

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

`div.lazy-background`요소는 CSS에 호출되는 배경 이미지를 포함한다. 그러나 이 예제에서는, 화면에 표시될때 `visible` 속성을 추가함으로써 `div.lazy-background` 요소의 `div.lazy-background` 속성을 격리 시킬 수 있다.

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

여기에서는, 교차 관찰자를 이용하여 엘리먼트가 화면에 표시되고 있는지 Javascript를 이용하여 확인하고 `visible` 클래스를 `div.lazy-background` 엘리먼트에 추가하여 이미지를 로딩한다.

```javscript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

앞에서 설명한 것처럼 모든 브라우저가 교차 관찰자를 지원하는 것은 아니므로 대체 수단 또는 polyfill을 제공해야 한다. [CodePen 예제](https://codepen.io/malchata/pen/wyLMpR)를 통해 동작을 확인할 수 있다.


## 비디오 지연 로딩

이미지 엘리먼트와 마찬가지로 비디오를 지연 로드할 수도 있다. 일반적인 상황에서 비디오를 로드할 때는 `<video>` 태그를 사용한다.(제한적인 구현으로 [`<img>`를 사용하는 대체 방법](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)이 등장했음에도 불구하고) 그러나 `<video>`의 로딩 속도는 사용 사례에 따라 달라진다. 각각 다른 해결책이 필요한 몇가지 시나리오에 대해 논의해 보자.

### 자동 재생이 되지 않는 비디오의 경우 

사용자가 재생을 눌러야 재생되는 비디오(ex:자동 재생되지 않는 비디오)의 경우, `<video>` 엘리먼트에서 [`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload) 속성을 지정하는 것이 좋다.

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

여기서는 `preload` 속성에 `none`을 적용하여 브라우저가 비디오 데이터를 사전에 처리하지 못하도록 한다. 때문에 비디오의 공간을 차지하기 위해 `poster` 속성을 사용하여 `<video>` 엘리먼트에 placeholder를 지정한다. 그 이유는 비디오 로드에 대한 기본 동작이 브라우저마다 다를 수 있기 때문이다.

* Chrome에서는 `preload` 기본 값이 `auto`이었지만 Chrome 64에서는 `metadata`가 기본 값으로 설정된다. 그렇지만 데스크탑 버전 크롬에서는 `Content-Range` 헤더를 사용하여 비디오의 일부를 사전 로드할 수 있다. Firefox, Edge및 I.E.11은 유사하게 동작한다.
* 데스크탑 Chrome과 마찬가지로 Safari의 11.0 데스크탑 버전은 비디오 range를 미리 로드한다. 버전 11.2(현재 Safari의 Tech Preview 버전)에서는 비디오 metadata만 사전 로드된다. [iOS의 Safari에서는 비디오가 사전 로드되지 않는다.](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9)
* [데이터 세이버 모드](https://support.google.com/chrome/answer/2392284)가 켜져있을 경우, `preload` 기본 값은 `none`이다.

`preload` 대한 브라우저의 기본 동작은 고정된 것이 아니기 때문에 명시적으로 적는 것이 최선의 방법이다. 이 경우 사용자가 재생 눌러야 시작하는 모든 플랫폼에서 `preload="none"`을 사용하면 비디오 로드를 지연시킬 수 있다. 그러나 `preload` 속성이 비디오 지연 로드를 구현하는 유일한 방법은 아니다. [비디오 프리로드를 통한 빠른 재생](https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload)은 Javascript에서 비디오 재생 작업에 대한 아이디어를 제공할 수 있다.

불행하게도, 다음에 다룰 움직이는 GIF 이미지 대신 비디오를 사용하고 싶을 때는 유용하지 않다.

### GIF 이미지의 대체 동영상

움직이는 GIF는 광범위한 사용되지만, 여러가지 면에서 (특히 파일 크기) 비디오에 비해 하위 수준이다. 움직이는 GIF는 용량이 몇십 메가바이트까지 커질 수가 있다. 비슷한 화질의 비디오는 용량이 더 작다.

GIF 대체물로 `<video>` 앨리먼트를 사용하는 것은 `<img>` 앨리먼트만큼 간단하지 않다. 움직이는 GIF에는 다음과 같은 세가지 동작이 있다.

1. 로드되면 자동으로 재생한다.
2. 항상 그런 것은 아니지만, 루프가 계속 반복된다.
3. 오디오 트랙이 없다.

`<vidoe>` 엘리먼트를 사용하여 위의 세가지 특징을 충족하는 방법은 다음과 같다.

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

`autoplay`, `muted`, 그리고 `loop` 속성은 따로 값을 할당할 필요 없는 속성이다. [`playsinline`은 iOS에서 자동 재생을 하기 위해 필요하다.](https://webkit.org/blog/6784/new-video-policies-for-ios/) 이제 플랫폼 전반에 걸쳐 움직이는 GIF를 비디오로 대체할 수 있다. 하지만 어떻게 하면 지연 로딩을 구현할 수 있을까? [Chrome은 비디오를 느리게 로드](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg)하지만 모든 브라우저에서 이러한 최적화된 동작을 제공할 수는 없다. 사용자와 애플리케이션 요구 사항에 따라 문제를 직접 해결해야 할 수도 있다. 그러려면 `<video>` 마크업을 수정하면 된다.

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

[`poster`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster) 속성이 추가된 것을 볼 수 있다. 이 속성을 사용하면 `<video>` 엘리먼트의 비디오가 지연 로드될 때까지 공간을 차지할 placeholder 이미지를 지정할 수 있다. 이전의 `<img>` 지연 로딩 예제와 마찬가지로 각`<source>` 엘리먼트의 `data-src` 속성에 동영상 URL을 넣어 둔다. 여기에서 이전 교차 관찰자를 기반으로한 이미지 지연 로딩 예제와 유사한 몇 가지 JavaScript를 사용한다.

```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

`<video>` 요소를 지연 로딩할 때, 모든 자식 `<source>` 엘리먼트들을 반복하면서 `data-src`속성을 `src`속성에 대입한다.이를 완료하면 엘리먼트에서 `load` 메서드를 호출하여 비디오 로딩을 발생시키면 `autoplay`속성 때문에 자동적으로 비디오가 재생 된다.

이 방법을 사용하면 움직이는 GIF 대신 비디오를 사용할 수 있으면서 데이터 사용량도 줄이고 지연 로딩을 구현할 수 있게된다.


## 지연 로딩 라이브러리

지연 로딩이 내부적으로 어떻게 동작하는지에 대해 별로 신경쓰지 않기를 원한다면 선택할 수 있는 옵션이 많이 있다. 많은 라이브러리들이 이 가이드에 설명된 것과 유사한 마크업 패턴을 사용한다. 다음은 유용한 지연 로딩 라이브러리이다.

* [lazysizes](https://github.com/aFarkas/lazysizes)는 이미지 및 iframe을 지연 로딩하는 모든 기능을 갖춘 라이브러리이다. 여기서 사용하는 패턴은 `<img>` 엘리먼트에 있는 `lazyload` 클래스에 자동으로 바인딩되고, `data-src` 또는 `data-srcset` 속성에 이미지 URL을 지정해야 한다는 점에서 여기에 나와 있는 코드 예제와 매우 유사하다. 이 라이브러리는 교차 관찰자를 사용하고 [여러 플러그인](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo)으로 사용하여 비디오 지연 로딩도 구현할 수 있다.
* [lozad.js](https://github.com/ApoorvSaxena/lozad.js) 교차 관찰자만 사용하는 초경량 라이브러리이다. 따라서 성능은 뛰어나지만 오래된 브라우저에서 사용하려면 먼저 polyfill을 처리 해야한다.
* [blazy](https://github.com/dinbror/blazy)는 또다른 가벼운(1.4 KB)로 라이브러리이다. lazysize와 마찬가지로 로딩을 위해 또다른 라이브러리가 필요하지 않으며 IE7 +에서도 작동한다. 불행히도 교차 관찰자는 사용하지 않는다.
* [yall.js](https://github.com/malchata/yall.js)는 IntersectionObserver를 사용하고 이벤트 핸들러로 돌아가는 원작자가 작성한 라이브러리이다. I.E.11 및 주요 브라우저와 호환된다.
* 만약 리엑트에 특화된 라이브러리를 찾고 있는다면, [react-lazyload](https://github.com/jasonslyvia/react-lazyload)를 고려할 수 있다. 교차 관찰자를 사용하지 않지만, React를 사용하여 응용 프로그램을 개발하는 데 익숙한 사용자에게 이미지를 지연 로딩하는 익숙한 방법을 제공한다.

이 지연 로딩 라이브러리들은 각각은 다양한 지연 로딩 작업을 위한 많은 마크업 패턴으로 잘 문서화되어 있다. 깊게 고민하기 싫다면 라이브러리를 이용하라.


## 무엇이 잘 못될수 있을까

이미지 및 비디오를 지연 로딩하는 것은 성능 이점을 가지지 만 가볍게 볼일은 아니다. 잘못 이해한다면, 의도하지 않은 결과가 발생할 수 있다. 따라서 다음 사항을 염두에 두는 것이 중요하다.

### 폴드(the fold)를 기억하라

> 폴드란 스크롤 없이 볼 수 있는 영역을 가르킨다. 신문 페이지의 상반부를 가르키는 용어에서 유래.

JavaScript를 사용하여 페이지에 있는 모든 미디어 리소스를 지연 로드하는 것이 좋을 수도 있지만 이러한 유혹을 이겨 내야 한다. 스크롤 없이 볼수 있는 폴드 영역에 있는 리소스들은 지연 로딩이 되어서는 안 된다. 이러한 자원은 중요 자산으로 간주되어야 하므로 정상적으로 로딩 되어야한다.

지연 로딩을 대신 평범한 방식으로 중요한 자원 리소스들을 로딩하는 이유는 지연 로딩이 스크립트가 로딩을 완료하고 실행을 시작하여 DOM이 반응하기 전까지 중요한 자원 리소스들의 로딩을 지연을 시킨다는 점이다. 스크롤해야 볼 수있는 부분의 이미지는 괜찮지만 폴드 영역에 위치한 중요한 리소스들은 `<img>` 엘리먼트를 사용하는 것이 더 빠르다.

물론 웹 사이트들이 다양한 크기의 스크린에서 보여지고 있는 요즘은 폴드 영역이 어디에 놓여 있는지 잘 모르겠다. 노트북의에서 폴드 영역이 위에 있다면 모바일 기기에선 아래에 있을 수 있다. 모든 상황에서 이 문제를 최적으로 해결하기 위한 최고의 해결책은 없다. 페이지의 중요 리소스들을 따로 관리하여 일반적인 방식으로 로드해야한다.

또한, 지연 로드를 발생시키는 폴드 영역의 기준 선은 너무 엄격하지 않아도 된다. 사용자가 해당 리소스가 있는 부분으로 스크롤하기 전에 이미지가 잘 로드될 수 있도록 폴드 영역 아래로 일정 거리의 버퍼 영역을 설정하는 것이 좋다. 예를 들어 교차 관찰자 API를 사용하면 새로운 `IntersectionObserver`인스턴스를 만들 때 옵션 객체에서 `rootMargin`속성 을 지정할 수 있다. 이건 효과적으로 엘리먼트에 버퍼를 주며, 엘리먼트가 화면에 표시되기 전에 지연 로딩 동작을 수행한다.

```js
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin: "0px 0px 256px 0px"
});
```

`rootMargin`에 대한 값이 CSS의 `marin` 속성 값과 유사하게 보이는 이유는 같은 값이기 때문이다! 이 경우 관측 요소의 맨 아래 여백(기본적으로 브라우저 뷰포트이지만 `root` 속성을 사용하여 특정 요소로 변경할 수 있음)을 256픽셀로 확장한다. 즉, 이미지 요소가 뷰포트에서 256픽셀 이내에 있으면 콜백 함수가 실행된다. 즉, 사용자가 실제로 보기 전에 이미지가 로드되기 시작한다.

스크롤 이벤트를 사용하여 동일한 효과를 얻으려면 `getBoundingtlientRect` 확인 란을 조정하여 버퍼를 포함시키면 교차 관찰자를 지원하지 않는 브라우저에서도 동일하게 작동 합니다.


### 레이아웃 이동 및 placeholder

지연 로딩 미디어는 placeholder를 사용하지 않을 경우 레이아웃을 변경시킬 수 있다. 이러한 변화는 사용자를 혼란스럽게 할 수 있으며 시스템 리소스를 소비하고 값 비싼 DOM 레이아웃 작업을 유발할 수 있다. 최소한 대상 이미지와 동일한 크기를 차지하는 단색 placeholder나 로드하기 전에 미디어 항목의 내용을 암시하는 [LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) 또는 [SQIP](https://github.com/technopagan/sqip) 와 같은 기술을 사용하는 것이 좋다.

`<img>`태그에선, `src`속성이 최종 이미지의 URL로 업데이트 될 때까지 태그의 위치가 변경되면 안된다. `<video>` 태그에선 이미지 placeholder를 사용하기 위해 `poster`속성을 사용한다. 또한, `width`와 `height` 속성 모두 `<img>` 및 `<video>`태그에서 사용할 수 있는 속성이다. 이렇게하면 미디어가 로드 될 때 placeholer에서 최종 이미지로 전환해도 엘리먼트의 크기가 변경되지 않는다.


### 이미지 디코딩 지연

JavaScript에서 큰 이미지를 로딩하여 DOM에 놓으면 기본 스레드가 잠기기 때문에, 디코딩이 발생하는 동안 사용자 인터페이스가 짧은 시간 동안 응답하지 않게된다. DOM에 삽입하기 전에 [디코드 메서드를 이용한 비동기 이미지 디코딩](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)을 사용하면 이러한 문제를 해결할 수 있다. 하지만 아직 모든 브라우저에서 사용할 수 없으며, 사용하고 싶으면 먼저 확인해야한다. 다음은`image.decode()`를 사용하는 방법을 보여 준다.

```js
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

[CodePen 예제](https://codepen.io/malchata/pen/WzeZGW)를 확인하여 위와 유사한 코드를 확인해보라. 대부분의 이미지가 작다면 큰 효과는 없을테지만, 큰 이미지를 지연 로딩하여 DOM에 삽입할 때 분명 효과가 있다.

### 로드가 되지 않을 때

때로는 미디어 자원이 어떤 이유로 로드되지 않고 오류가 발생한다. 이런 일은 언제 발생할까? 하나의 가상 시나리오가 있다.: 짧은 시간(예: 5분) 동안 HTML 캐싱 정책이 있다고 가정하자. 사용자는 사이트를 방문 하거나 사용자가 탭을 연 상태로 오래동안(예: 몇시간)있다가 다시 사이트를 탐색한다. 이 경우 어느 시점에서 재배포가 발생한다고 하자. 이 배포 중에 이미지 리소스의 이름이 해시 기반으로 변경되거나 완전히 제거된다면, 사용자가 이미지를 지연 로드할 때는 리소스를 사용할 수 없으므로 실패한다.

비교적 드문 경우이지만 지연 로딩이 실패 할 경우 백업 계획을 세울 수 있다. 이미지의 경우 다음과 같이 해결할 수 있다.

```js
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

오류 발생 시 수행할 작업은 애플리케이션에 따라 다르다. 예를 들어 이미지 placeholder 영역을 사용자가 이미지를 다시 로드할 수 있는 단추로 바꾸거나 이미지 placeholder 영역에 오류 메시지를 표시할 수 있다.

다른 시나리오도 발생 할 수 있다. 어떤 작업을 수행하든 오류가 발생했을 때 사용자에게 알려주는 것은 절대 나쁜 것이 아니며, 오류가 발생할 경우 사용자에게 조치를 취해 줄 수도 있다. 

### 자바스크립트의 사용 가능성

JavaScript를 항상 사용할 수 있다고 가정해서는 안된다. JavaScript를 사용할 수 없는 경우, 이미지를 지연 로딩하려할 때 이미지를 보여 주는 `<noscript>`마크업을 고려해보라. 가장 간단한 대체 예제는 JavaScript가 비활성화된 경우 이미지를 제공하기 위해 `<noscript>` 엘리먼트를 사용하는 것이다.

```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="I'm an image!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="I'm an image!">
</noscript>
```

JavaScript를 사용할 수 없으면 위의 예제는 placeholder 이미지와 `<noscript>` 엘리먼트에 포함 된 이미지가 모두 표시된다. 이 문제를 해결하기 위해 `<html>` 태그에 `no-js` 클래스를 다음과 같이 배치 할 수 있습니다.

```html
<html class="no-js">
```

그런 다음, JavaScript가 사용가능한 경우 `<html>` 엘리먼트에서 `no-js`클래스를 제거하는 코드를 `<head>` 태그 안에 넣는다. 다만 스타일시트를 요청하는 `<link>` 태그 앞에 배치한다.


```js
<script>document.documentElement.classList.remove("no-js");</script>
```

마지막으로, CSS를 사용하여 JavaScript를 사용할 수 없을 때 지연 로딩에 사용하는 클래스로 엘리먼트를 숨길 수 있다.

```css
.no-js .lazy {
  display: none;
}
```

이렇게 하면 placeholder 이미지가 로드되지 않지만 결과가 더 바람직하다. JavaScript를 사용할 수 없는 사용자는 placeholder 이미지를 볼 순 없지만 실제 이미지를 볼 수 있다.

## 결론

잘 사용하면 지연 로딩으로 사이트의 초기 로드 시간 및 페이지 페이로드를 효과적으로 낮출 수 있다. 사용자는 볼 수 없는 미디어 자원의 불필요한 네트워크 활동 및 처리 비용을 부담하지 않고, 원하는 경우 볼 수 있다.

성능향상에 관해선 지연 로딩은 논쟁의 여지가 없다. 사이트에 많은 인라인 이미지가있는 경우 불필요한 다운로드를 줄이는 완벽한 방법이다. 여러분의 사이트 사용자와 프로젝트 이해 관계자가 고마워 할 것이다!