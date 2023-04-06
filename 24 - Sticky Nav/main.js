window.addEventListener('DOMContentLoaded', main)

function main() {
  const body = document.body
  const nav = document.querySelector('nav')
  if (!nav) return
  console.log('init')

  const navOffsetTop = nav.offsetTop

  // TODO: add throttling
  window.addEventListener('scroll', () => {
    if (window.scrollY > navOffsetTop) {
      body.classList.add('js-sticky')
    } else {
      body.classList.remove('js-sticky')
    }
  })
}
