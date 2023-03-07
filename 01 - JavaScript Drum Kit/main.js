'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const keysList = [...document.querySelectorAll('.key')]
  const audioList = [...document.querySelectorAll('audio')]

  keysList.forEach(elem => {
    elem.addEventListener('transitionend', evt => {
      if (evt instanceof TransitionEvent) {
        if (evt.propertyName !== 'transform') return
        if (evt.target instanceof HTMLElement) evt.target.classList.remove('playing')
      }
    })
  })

  window.addEventListener('keydown', evt => {
    const keyElem = keysList.find(elem => elem.getAttribute('data-key') === evt.code)
    keyElem?.classList.add('playing')

    const audioElem = audioList.find(elem => elem.getAttribute('data-key') === evt.code)
    if (audioElem) audioElem.currentTime = 0
    audioElem?.play()
  })
})
