'use strict'

window.addEventListener('DOMContentLoaded', main)

function main() {
  const sectionList = document.querySelectorAll('.section-wrapper section')
  const radioInputs = document.querySelectorAll('.controls-radio input[type="radio"]')
  const checkboxInputs = document.querySelectorAll('.controls-checkbox input[type="checkbox"]')
  const clearButton = document.querySelector('button#clear')
  const resetButton = document.querySelector('button#reset')
  if (
    !sectionList.length ||
    !radioInputs.length ||
    !checkboxInputs.length ||
    !clearButton ||
    !resetButton
  )
    return
  console.log('init')

  const config = {
    capture: false,
    once: false,
  }
  let isStopPropagating = false
  let i = 0

  function clearStyles() {
    sectionList.forEach(elem => elem.classList.remove('outline'))
    i = 0
  }

  function handleClickOnSection(evt) {
    if (!evt || !(evt instanceof Event)) return

    setTimeout(() => {
      this.classList.add('outline')
    }, 250 * i)
    i++

    if (isStopPropagating) evt.stopPropagation()
  }

  function setupListeners() {
    sectionList.forEach(elem => elem.addEventListener('click', handleClickOnSection, config))
  }
  function removeListeners() {
    sectionList.forEach(elem => elem.removeEventListener('click', handleClickOnSection, config))
  }

  function updateConfig() {
    removeListeners()
    clearStyles()

    radioInputs.forEach(elem => {
      if (!(elem instanceof HTMLInputElement)) return

      if (elem.id === 'capture') config.capture = elem.checked
    })

    checkboxInputs.forEach(elem => {
      if (!(elem instanceof HTMLInputElement)) return

      if (elem.id === 'stop-propagation') isStopPropagating = elem.checked
      if (elem.id === 'event-once') config.once = elem.checked
    })

    setupListeners()
  }

  function resetAll() {
    checkboxInputs.forEach(elem => {
      if (elem instanceof HTMLInputElement) elem.checked = false
    })
    radioInputs.forEach(elem => {
      if (elem instanceof HTMLInputElement && elem.id === 'bubbling') elem.checked = true
    })
    updateConfig()
  }

  clearButton.addEventListener('click', clearStyles)
  resetButton.addEventListener('click', resetAll)
  radioInputs.forEach(elem => elem.addEventListener('change', updateConfig))
  checkboxInputs.forEach(elem => elem.addEventListener('change', updateConfig))

  setupListeners()
}
