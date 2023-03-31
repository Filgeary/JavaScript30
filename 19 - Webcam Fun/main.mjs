window.addEventListener('DOMContentLoaded', main)

function main() {
  const video = document.querySelector('video')
  const canvas = document.querySelector('canvas')
  const ctx = canvas?.getContext('2d')
  const strip = document.querySelector('.strip')
  const audio = document.querySelector('audio')
  const controlTakePhoto = document.querySelector('button')
  if (!video || !canvas || !ctx || !strip || !audio || !controlTakePhoto) return

  async function getVideoStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (video) video.srcObject = stream
    } catch (err) {
      console.error(err)
    }
  }

  function paintToCanvas() {
    if (!video || !canvas || !ctx) return
    const { videoWidth, videoHeight } = video
    canvas.width = videoWidth
    canvas.height = videoHeight

    function paint() {
      if (!ctx || !video) return
      ctx.drawImage(video, 0, 0)
      let imageData = ctx.getImageData(0, 0, videoWidth, videoHeight)
      imageData = rgbSplit(imageData)
      ctx.putImageData(imageData, 0, 0)
      requestAnimationFrame(paint)
    }
    paint()
  }

  function takePhoto() {
    if (!audio || !canvas || !strip) return
    audio.currentTime = 0
    audio.play()

    const data = canvas.toDataURL()
    const rawImgElem = `<img src="${data}" alt="photo"></img>`
    strip.insertAdjacentHTML('beforeend', rawImgElem)
  }

  // Filter
  function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i - 150] = pixels.data[i + 0] // RED
      pixels.data[i + 500] = pixels.data[i + 1] // GREEN
      pixels.data[i - 550] = pixels.data[i + 2] // Blue
    }
    return pixels
  }

  getVideoStream()
  video.addEventListener('canplay', paintToCanvas)
  controlTakePhoto.addEventListener('click', takePhoto)
}
