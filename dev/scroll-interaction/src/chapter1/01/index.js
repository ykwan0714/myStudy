import '/assets/css/common.css'
import './index.css'
import { $ } from '/assets/js/common.js'
;(() => {
  const app = document.getElementById('App')
  app.innerHTML = `<div class="wrap">
 <section class="sec01">
   <h2 class="com_tit">스크롤 백분율 구하는 방법</h2>
   <p class="com_txt">뒤에 나오는 예제에서 반복 학습을 계속합니다. 부담없이 학습하세요 :)</p>
   <article class="content">
     <div class="progress">
       <span class="bar"></span>
       <p class="txt">
         0%
       </p>
     </div>
     가<br>
     나<br>
     다<br>
     라<br>
     마<br>
     바<br>
     사<br>
     아<br>
     자<br>
     차<br>
     카<br>
     타<br>
     파<br>
     하
   </article>
 </section>
</div>`

  window.addEventListener('load', () => {
    const $text = $('.progress .txt')
    const $progressBar = $('.progress .bar')

    const getPercent = () => {
      const scrollHeight = $('.sec01').offsetHeight
      // sec01의 전체 높이 (scrollHeight)에서 브라우저의 높이를 빼서 실제 스크롤 되는 영역을 계산
      const scrollRealHeight = scrollHeight - window.innerHeight
      // 일부 오래된 브라우저는 scrollY 대신 pageYOffset만 지원하는 경우가 있다. 그 외엔 scorllY를 써도 무방
      const winScrollTop = window.pageYOffset
      // 스크롤 된 값 (winScrollTop) / 실제 스크롤 높이 (scrollRealHeight) * 100 으로 백분율을 구한다.
      const scrollPercent = (winScrollTop / scrollRealHeight) * 100

      $progressBar.style.width = `${scrollPercent}%`
      $text.innerText = `${Math.round(scrollPercent)}%`
    }

    getPercent()
    document.addEventListener('scroll', getPercent)
  })
})()
