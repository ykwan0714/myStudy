import '/assets/css/common.css'
import './index.css'
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
    const $text = document.querySelector('.progress .txt')
    const $progressBar = document.querySelector('.progress .bar')

    const getPercent = () => {
      const scrollHeight = document.querySelector('.sec01').offsetHeight
      const scrollRealHeight = scrollHeight - window.innerHeight
      const winScrollTop = window.pageYOffset
      const scrollPercent = (winScrollTop / scrollRealHeight) * 100

      $progressBar.style.width = `${scrollPercent}%`
      $text.innerText = `${Math.round(scrollPercent)}%`
    }

    getPercent()
    document.addEventListener('scroll', getPercent)
  })
})()
