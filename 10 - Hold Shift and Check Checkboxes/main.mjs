window.addEventListener('DOMContentLoaded', init)

function init() {
  const inbox = document.querySelector('.inbox')
  const inputs = inbox?.querySelectorAll('input') || []
  let isShiftPressed = false
  let from = 0
  let to = 0

  window.addEventListener('keydown', evt => {
    if (evt.key === 'Shift') {
      isShiftPressed = true
      const { start, end } = findChecked()
      from = start
      to = end
    }
  })
  window.addEventListener('keyup', evt => {
    if (evt.key === 'Shift') {
      isShiftPressed = false
    }
  })

  inbox?.addEventListener('click', () => {
    if (isShiftPressed) {
      checkItems(from, to)
    }
  })

  function checkItems(from, to) {
    const min = Math.min(from, to)
    const max = Math.max(from, to)

    inputs.forEach((elem, idx) => {
      if (idx + 1 >= min && idx + 1 <= max) {
        elem.checked = true
      }
    })
  }

  function findChecked() {
    let start = [...inputs].findIndex(elem => elem.checked)
    start = start > -1 ? start + 1 : 0

    let end = [...inputs]
      .slice()
      .reverse()
      .findIndex(elem => elem.checked)
    end = end > -1 ? end + 1 : 0

    return {
      start,
      end,
    }
  }
}
