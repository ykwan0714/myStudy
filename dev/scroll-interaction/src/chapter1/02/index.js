import '/assets/css/common.css'
import './index.css'
import { $ } from '/assets/js/common.js'
import img1 from '/assets/images/1.jpg'
import img2 from '/assets/images/2.jpg'
import img3 from '/assets/images/3.jpg'
;(() => {
  const app = document.getElementById('App')
  app.innerHTML = `<div class="wrap">
  <section class="sec01">
    <h2 class="com_tit">INFINITE SCROLL</h2>
    <article class="sc_infinity">
      <ul class="list">
        <li>
          <figure>
            <img src="${img1}">
          </figure>
        </li>
        <li>
          <figure>
            <img src="${img2}">
          </figure>
        </li>
        <li>
          <figure>
            <img src="${img3}">
          </figure>
        </li>
        <li>
          <figure>
            <img src="${img1}">
          </figure>
        </li>
        <li>
          <figure>
            <img src="${img2}">
          </figure>
        </li>
        <li>
          <figure>
            <img src="${img3}">
          </figure>
        </li>
      </ul>
    </article>
    <div class="footer">
      <p>FOOTER</p>
    </div>
  </section>
  </div>`

  window.addEventListener('load', () => {
    const $list = $('.sc_infinity .list')
    const breakCount = 10
    let fetchCount = 0

    const fetchList = () => {
      let rv = []
      if (fetchCount < breakCount) {
        rv = [img1, img2, img3]
        fetchCount++
      }
      return rv
    }

    const listCall = () => {
      const footerHeight = $('.footer')?.offsetHeight || 0
      const winSrcollTop = window.pageYOffset
      // 문서의 높이 - 스크린 높이 - 푸터의 높이 -> 스크롤이 허용되는 높이
      const triggerTop =
        document.body.offsetHeight - window.innerHeight - footerHeight

      if (winSrcollTop >= triggerTop) {
        const data = fetchList()
        if (data.length) {
          data.forEach((el) => {
            const li = document.createElement('li')
            li.innerHTML = `<figure>
              <img src="${el}">
            </figure>`
            $list.appendChild(li)
          })
        }
      }
    }

    window.addEventListener('scroll', listCall)
    listCall()
  })
})()
