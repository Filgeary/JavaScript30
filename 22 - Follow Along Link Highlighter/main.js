window.addEventListener('DOMContentLoaded', main)

function main() {
  const links = document.querySelectorAll('a')
  if (!links.length) return
  console.log('init')

  // prepare element
  const highlightElem = document.createElement('span')
  highlightElem.classList.add('highlight')
  document.body.appendChild(highlightElem)

  links.forEach(link => {
    link.addEventListener('mouseenter', function () {
      const { width, height, top, left } = this.getBoundingClientRect()
      const coords = {
        width,
        height,
        top: top + window.scrollY,
        left: left + window.scrollX,
      }

      highlightElem.style.width = `${coords.width}px`
      highlightElem.style.height = `${coords.height}px`
      highlightElem.style.transform = `translate(${coords.left}px, ${coords.top}px)`
    })
  })
}
