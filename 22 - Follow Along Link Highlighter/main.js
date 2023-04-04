window.addEventListener('DOMContentLoaded', main)

function main() {
  const links = document.querySelectorAll('a')
  if (!links.length) return
  console.log('init')

  function clearLinks() {
    links.forEach(elem => {
      elem.style.position = 'static'
      elem.classList.remove('highlight')
    })
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', function () {
      clearLinks()
      this.style.position = 'relative'
      this.classList.add('highlight')
    })
  })
}
