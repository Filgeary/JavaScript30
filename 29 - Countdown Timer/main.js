'use strict'

window.addEventListener('DOMContentLoaded', main)

function main() {
  const timerControlsWrapper = document.querySelector('.timer__controls')
  const timerControls = timerControlsWrapper?.querySelectorAll('button')
  const form = timerControlsWrapper?.querySelector('form')
  const displayWrapper = document.querySelector('.display')
  const timeLeftElem = displayWrapper?.querySelector('h1')
  const endTimeElem = displayWrapper?.querySelector('p')
  if (!form || !timeLeftElem || !endTimeElem || !timerControls?.length) return
  console.log('init')

  let timerId
  let timeLeftInSec = 0
  let endTime = ''

  function createTimer(seconds) {
    if (timerId) clearInterval(timerId)

    let now = Date.now()
    let future = now + seconds * 1000
    endTime = new Date(future).toLocaleTimeString()
    endTime = formatLocalTime(endTime)
    updateEndTimeElem(endTime)

    timeLeftInSec = Math.ceil((future - now) / 1000)
    updateTimeLeftElem(timeLeftInSec)

    timerId = setInterval(() => {
      if (timeLeftInSec <= 0) {
        clearInterval(timerId)
        return
      }

      timeLeftInSec = Math.ceil((future - Date.now()) / 1000)
      updateTimeLeftElem(timeLeftInSec)
    }, 1000)
  }

  function updateTimeLeftElem(timeInSec) {
    if (!timeLeftElem) return
    timeLeftElem.textContent = formatTimeInSec(timeInSec)
  }

  function updateEndTimeElem(timeEnd) {
    if (!endTimeElem) return
    endTimeElem.textContent = `Be back at ` + timeEnd
  }

  function formatTimeInSec(timeInSec = 0) {
    const seconds = timeInSec % 60
    const minutes = (timeInSec - seconds) / 60
    const format = number => (number < 10 ? '0' + number : number)

    return format(minutes) + ':' + format(seconds)
  }

  function formatLocalTime(localTime) {
    const [time, AM_or_PM] = localTime.split(' ')
    const [min, sec] = time.split(':')

    return `${min}:${sec} ${AM_or_PM || ''}`.trim()
  }

  timerControls.forEach(elem => {
    elem.addEventListener('click', function () {
      clearInterval(timerId)
      timeLeftInSec = 0

      const seconds = Number(this.dataset.time) || 0
      createTimer(seconds)
    })
  })

  form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const minutes = new FormData(this).get('minutes') || 0
    const seconds = +minutes * 60
    createTimer(seconds)
    this.reset()
  })
}
