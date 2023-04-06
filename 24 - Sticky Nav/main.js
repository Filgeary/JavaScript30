window.addEventListener('DOMContentLoaded', main)

function main() {
  const nav = document.querySelector('nav ul')
  const logoElem = nav?.querySelector('.logo')
  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height
  if (!nav || !logoElem || !headerHeight) return
  if (!(logoElem instanceof HTMLElement)) return
  console.log('init')

  const logoWidth = Math.floor(window.innerWidth / (nav.children.length - 1))

  // TODO: add throttling
  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      logoElem.style.maxWidth = `${logoWidth}px`
    } else {
      logoElem.style.maxWidth = '0'
    }
  })
}
