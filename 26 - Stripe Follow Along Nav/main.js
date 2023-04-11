window.addEventListener('DOMContentLoaded', main)

function main() {
  const triggers = document.querySelectorAll('.cool > li')
  const background = document.querySelector('.dropdownBackground')
  const nav = document.querySelector('.top')
  if (!triggers.length || !background || !nav) return
  console.log('init')

  triggers.forEach(elem => {
    if (!(elem instanceof HTMLLIElement) || !(background instanceof HTMLElement)) return

    elem.addEventListener('mouseenter', function () {
      this.classList.add('trigger-enter', 'trigger-enter-active')
      const dropdown = this.querySelector('.dropdown')
      if (!(dropdown instanceof HTMLElement)) return

      const { width, height, left, top } = dropdown.getBoundingClientRect()
      background.classList.add('open')
      background.style.width = width + 'px'
      background.style.height = height + 'px'
      background.style.transform = `translate(${left}px, ${top}px)`
    })
  })

  triggers.forEach(elem => {
    if (!(elem instanceof HTMLLIElement)) return

    elem.addEventListener('mouseleave', function () {
      this.classList.remove('trigger-enter', 'trigger-enter-active')
      background.classList.remove('open')
    })
  })
}
