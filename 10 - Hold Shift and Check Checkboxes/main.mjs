window.addEventListener('DOMContentLoaded', init)

function init() {
  const inbox = document.querySelector('.inbox')
  if (!inbox || !(inbox instanceof HTMLElement)) return
  const inputs = [...inbox.querySelectorAll('input')]
  if (!inputs) return

  let from = 0
  let to = 0

  inbox.addEventListener('click', evt => {
    if (evt.shiftKey) {
      const { start, end } = findChecked() || {}
      from = start || 0
      to = end || 0
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
    let start = inputs.findIndex(elem => elem.checked)
    start = start > -1 ? start + 1 : 0

    let end
    for (let i = inputs.length - 1; i >= 0; i--) {
      const element = inputs[i]
      if (element.checked) {
        end = i
        break
      }
    }
    end = end && end > -1 ? end + 1 : 0

    return {
      start,
      end,
    }
  }
}
