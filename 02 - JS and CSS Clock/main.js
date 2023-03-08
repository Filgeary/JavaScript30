'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const hourElem = document.querySelector('.hour-hand')
  const minuteElem = document.querySelector('.min-hand')
  const secondElem = document.querySelector('.second-hand')

  function getCurrentTime() {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const seconds = new Date().getSeconds()

    return { hours, minutes, seconds }
  }

  function mapTimeToDegree({ hours, minutes, seconds }) {
    const offset = Math.floor(minutes < 60 ? minutes / 2 : 0)
    const hoursDegree = (360 / 12) * hours + offset
    const minutesDegree = (360 / 60) * minutes
    const secondsDegree = (360 / 60) * seconds

    return { hoursDegree, minutesDegree, secondsDegree }
  }

  function setTransitionValues({
    hourElem,
    minuteElem,
    secondElem,
    hoursDegree,
    minutesDegree,
    secondsDegree,
  }) {
    if (hourElem && hourElem instanceof HTMLElement) {
      hourElem.style.transform = `rotate(${hoursDegree}deg)`
    }
    if (minuteElem && minuteElem instanceof HTMLElement) {
      minuteElem.style.transform = `rotate(${minutesDegree}deg)`
    }
    if (secondElem && secondElem instanceof HTMLElement) {
      secondElem.style.transform = `rotate(${secondsDegree}deg)`
    }
  }

  setInterval(() => {
    const { hoursDegree, minutesDegree, secondsDegree } = mapTimeToDegree(getCurrentTime())
    setTransitionValues({
      hourElem,
      minuteElem,
      secondElem,
      hoursDegree,
      minutesDegree,
      secondsDegree,
    })
  }, 1000)
})
