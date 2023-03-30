window.addEventListener('DOMContentLoaded', main)

function main() {
  const ul = document.querySelector('ul')
  const liList = ul?.querySelectorAll('li')
  if (!liList) return

  const totalTimeInSeconds = Array.from(liList).reduce((acc, elem) => {
    const time = elem.dataset.time
    if (time) {
      const [minutes, seconds] = time.split(':')
      const totalTime = +minutes * 60 + +seconds
      return acc + totalTime
    }
    return acc
  }, 0)

  function calcTime(timeInSeconds) {
    if (!timeInSeconds || typeof timeInSeconds !== 'number') return

    const seconds = timeInSeconds % 60
    const totalMinutes = (timeInSeconds - seconds) / 60
    const minutes = totalMinutes % 60
    const hours = (totalMinutes - minutes) / 60

    return { hours, minutes, seconds }
  }

  function format(count) {
    return count < 10 ? `0${count}` : count
  }

  function renderResult() {
    const { hours = 0, minutes = 0, seconds = 0 } = calcTime(totalTimeInSeconds) || {}
    const h2Elem = document.createElement('h2')
    h2Elem.textContent = `Total Time - ${format(hours)}:${format(minutes)}:${format(seconds)}`
    ul?.insertAdjacentElement('afterend', h2Elem)
    h2Elem.scrollIntoView({ behavior: 'smooth' })
  }
  renderResult()
}
