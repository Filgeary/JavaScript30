'use strict'

window.addEventListener('DOMContentLoaded', main)

function main() {
  const wrapper = document.querySelector('.wrapper')
  const video = wrapper?.querySelector('video')
  const speedElem = wrapper?.querySelector('.speed')
  const speedBar = speedElem?.querySelector('.speed-bar')
  if (!video || !speedElem || !speedBar) return
  if (!(speedElem instanceof HTMLElement) || !(speedBar instanceof HTMLElement)) return
  console.log('init')

  const MIN = 0.5
  const MAX = 3
  const calcRateSpeed = ratio => (ratio * (MAX - MIN) + MIN).toFixed(1)
  const speedElemHeight = speedElem.offsetHeight

  speedElem.addEventListener('mousemove', evt => {
    const offsetY = evt.offsetY
    const ratio = +(offsetY / speedElemHeight).toFixed(2)
    const ratioInPercent = ratio * 100 + '%'
    const rateSpeed = calcRateSpeed(ratio)

    speedBar.style.height = ratioInPercent
    speedBar.textContent = rateSpeed + '×'
    video.playbackRate = +rateSpeed
  })
}
