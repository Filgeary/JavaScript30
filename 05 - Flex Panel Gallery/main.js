'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel')

  function cleaner(target) {
    panels.forEach(elem => {
      if (elem && elem instanceof HTMLElement) {
        if (elem !== target) elem.classList.remove('open')
      }
    })
  }

  panels.forEach(elem => {
    if (elem && elem instanceof HTMLElement) {
      elem.addEventListener('click', function () {
        cleaner(this)
        this.classList.toggle('open')
      })

      elem.addEventListener('transitionend', evt => {
        if (evt && evt instanceof TransitionEvent) {
          if (evt.propertyName !== 'flex-grow') return

          if (elem.classList.contains('isActive')) {
            elem.classList.remove('isActive')
          } else {
            elem.classList.add('isActive')
          }
        }
      })
    }
  })
})
