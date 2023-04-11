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
      this.classList.add('trigger-enter')
      setTimeout(() => {
        if (this.classList.contains('trigger-enter')) {
          this.classList.add('trigger-enter-active')
        }
      }, 100)
      const dropdown = this.querySelector('.dropdown')
      if (!(dropdown instanceof HTMLElement)) return

      const {
        width,
        height,
        left: dropdownLeft,
        top: dropdownTop,
      } = dropdown.getBoundingClientRect()
      const { left, top } = nav.getBoundingClientRect()
      background.classList.add('open')
      background.style.width = width + 'px'
      background.style.height = height + 'px'
      background.style.transform = `translate(${dropdownLeft - left}px, ${dropdownTop - top}px)`
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
