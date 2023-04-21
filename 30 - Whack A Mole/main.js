'use strict'

window.addEventListener('DOMContentLoaded', main)

function main() {
  const holes = document.querySelectorAll('.hole')
  const scoreBoard = document.querySelector('.score')
  const prevScoreElem = document.querySelector('[data-prevScore]')
  const speedBar = document.querySelector('.speed__bar')
  const moles = document.querySelectorAll('.mole')
  const buttonStart = document.querySelector('button[data-start]')
  if (!holes.length || !scoreBoard || !prevScoreElem || !speedBar || !moles.length || !buttonStart)
    return
  console.log('init')

  let isGameStarted = false
  let score = 0
  let prevScore = 0
  let initDelay = 1500
  let currentDelay = initDelay
  let ratioDelay = () => +((initDelay - currentDelay) / initDelay).toFixed(2)
  let timerIdRemoveMole

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function updateSpeedBarWidth() {
    if (!(speedBar instanceof HTMLElement)) return
    speedBar.style.width = `${ratioDelay() * 100}%`
  }

  function showRandomMole() {
    const randomHoleIndex = randomNumber(0, holes.length)

    holes.forEach((elem, i) => {
      if (i === randomHoleIndex) {
        elem.classList.remove('up')
        setTimeout(() => {
          elem.classList.add('up')
        }, 150)

        if (isGameStarted) {
          timerIdRemoveMole = setTimeout(() => {
            elem.classList.remove('up')
            window.alert('GAME OVER !\nYou are too slow !')
            prevScore = score
          }, currentDelay)
        }
      }
    })
  }

  function clearMoles() {
    holes.forEach(elem => elem.classList.remove('up'))
  }

  function updateScore() {
    if (!scoreBoard) return
    scoreBoard.textContent = score.toString()
  }

  function updatePrevScore() {
    if (!prevScoreElem) return
    prevScoreElem.textContent = prevScore.toString()
  }

  function startGame() {
    if (prevScore) updatePrevScore()
    isGameStarted = false
    currentDelay = initDelay
    score = 0
    updateScore()
    clearMoles()
    showRandomMole()
    updateSpeedBarWidth()
    isGameStarted = true
  }

  moles.forEach(elem =>
    elem.addEventListener('click', () => {
      if (score > 0 && score % 3 === 0) {
        currentDelay -= 100
        updateSpeedBarWidth()
      }

      clearTimeout(timerIdRemoveMole)
      score++
      updateScore()
      clearMoles()
      showRandomMole()
    }),
  )

  buttonStart.addEventListener('click', startGame)
}
