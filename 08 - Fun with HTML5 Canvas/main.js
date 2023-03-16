'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const canvasElem = document.querySelector('canvas')
  if (!canvasElem) return

  canvasElem.width = window.innerWidth
  canvasElem.height = window.innerHeight

  const ctx = canvasElem.getContext('2d')
  if (!ctx) return

  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  let isDrawing = false
  let prevX = 0
  let prevY = 0
  let hueColorValue = 0
  let lineWidth = 10
  let directionToUp = true

  canvasElem.addEventListener('mousedown', evt => {
    isDrawing = true
    const { offsetX, offsetY } = evt
    ;[prevX, prevY] = [offsetX, offsetY]
  })
  canvasElem.addEventListener('mouseup', () => (isDrawing = false))
  canvasElem.addEventListener('mouseout', () => (isDrawing = false))
  canvasElem.addEventListener('mousemove', evt => {
    if (!isDrawing) return

    const { offsetX, offsetY } = evt
    ctx.strokeStyle = `hsl(${hueColorValue}, 100%, 50%)`
    ctx.lineWidth = lineWidth

    // Drawing on Canvas
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
    ;[prevX, prevY] = [offsetX, offsetY]

    hueColorValue++
    if (lineWidth < 10 || lineWidth > 75) directionToUp = !directionToUp
    if (directionToUp) lineWidth++
    else lineWidth--
  })
})
