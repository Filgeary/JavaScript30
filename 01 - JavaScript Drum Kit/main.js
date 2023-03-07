'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const keysElems = [...document.querySelectorAll('.key')]
  const audioElems = [...document.querySelectorAll('audio')]
  let timer

  window.addEventListener('keydown', evt => {
    if (timer) clearTimeout(timer)

    const keyElem = keysElems.find(elem => elem.getAttribute('data-key') === evt.code)
    keyElem?.classList.add('playing')

    const audioElem = audioElems.find(elem => elem.getAttribute('data-key') === evt.code)
    audioElem?.play()

    timer = setTimeout(() => keysElems.forEach(elem => elem.classList.remove('playing')), 300)
  })
})
