window.addEventListener('DOMContentLoaded', main)

function main() {
  const wrapper = document.querySelector('.items')
  if (!wrapper || !(wrapper instanceof HTMLElement)) return
  console.log('init')

  let prevPos = 0
  let scrollLeft = 0
  let diff = 0
  let isStartDragging = false

  wrapper.addEventListener('mousedown', evt => {
    isStartDragging = true
    wrapper.classList.add('active')
    prevPos = evt.pageX
    scrollLeft = wrapper.scrollLeft
  })

  wrapper.addEventListener('mousemove', evt => {
    if (!isStartDragging) return

    diff = (evt.pageX - prevPos) * 1.5
    wrapper.scrollLeft = scrollLeft - diff
  })

  wrapper.addEventListener('mouseup', () => {
    isStartDragging = false
    wrapper.classList.remove('active')
  })

  wrapper.addEventListener('mouseleave', () => {
    isStartDragging = false
    wrapper.classList.remove('active')
  })
}
