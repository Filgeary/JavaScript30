window.addEventListener('DOMContentLoaded', init)

function init() {
  const query = 'ArrowUpArrowRightArrowDownArrowLeft'
  let temp = ''

  window.addEventListener('keyup', evt => {
    temp += evt.key
    if (temp.includes(query)) {
      alert('You Win !!!')
      temp = ''
    }
  })
}
