window.addEventListener('DOMContentLoaded', main)

function main() {
  const heroElem = document.querySelector('.hero')
  const heading = heroElem?.querySelector('h1')
  if (!heroElem || !(heroElem instanceof HTMLElement)) return
  if (!heading) return

  const halfWidth = window.innerWidth / 2
  const halfHeight = window.innerHeight / 2

  heroElem.addEventListener('mousemove', evt => {
    const { clientX, clientY } = evt
    const offsetX = (clientX - halfWidth) / 10
    const offsetY = (clientY - halfHeight) / 10

    heading.style.textShadow = `
      ${offsetX}px ${offsetY}px 2px rgba(30, 144, 255, 1),
      ${-offsetX}px ${-offsetY}px 2px rgba(255, 99, 71, 1)
    `
  })
}
