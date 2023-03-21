window.addEventListener('DOMContentLoaded', init)

function init() {
  const player = document.querySelector('.player')
  if (!player) return

  const video = player.querySelector('video')
  const progress = player.querySelector('.progress')
  const progressBar = player.querySelector('.progress__filled')
  const toggleControl = player.querySelector('.toggle')
  const rangeVolume = player.querySelector('input[name="volume"]')
  const rangePlaybackRate = player.querySelector('input[name="playbackRate"]')
  const skipButtons = player.querySelectorAll('[data-skip]')

  if (
    !video ||
    !progress ||
    !progressBar ||
    !toggleControl ||
    !rangeVolume ||
    !rangePlaybackRate ||
    !skipButtons
  )
    return

  // toggle playing
  function togglePlaying() {
    if (video?.paused) video.play()
    else video?.pause()
  }
  video.addEventListener('click', togglePlaying)
  toggleControl.addEventListener('click', togglePlaying)

  // update icon
  function updateIcon() {
    if (this && this instanceof HTMLVideoElement) {
      const icon = this.paused ? '►' : '❚ ❚'
      if (toggleControl) toggleControl.textContent = icon
    }
  }
  video.addEventListener('play', updateIcon)
  video.addEventListener('pause', updateIcon)

  // volume
  if (rangeVolume instanceof HTMLInputElement) {
    rangeVolume.addEventListener('change', function () {
      video.volume = +this.value
    })
  }

  // playbackRate
  if (rangePlaybackRate instanceof HTMLInputElement) {
    rangePlaybackRate.addEventListener('change', function () {
      video.playbackRate = +this.value
    })
  }

  // forward / back
  skipButtons.forEach(elem => {
    if (elem instanceof HTMLElement) {
      elem.addEventListener('click', function () {
        video.currentTime += parseInt(this.dataset.skip || '')
      })
    }
  })

  // progress
  function updateProgress() {
    let ratio
    if (video) {
      const { duration, currentTime } = video
      ratio = ((currentTime / duration) * 100).toFixed(2)
    }
    if (progressBar instanceof HTMLElement) {
      progressBar.style.flexBasis = `${ratio}%`
    }
  }
  video.addEventListener('timeupdate', updateProgress)

  // scrub
  if (progress instanceof HTMLElement) {
    progress.addEventListener('click', evt => {
      const scrubTime = Math.floor((evt.offsetX / progress.clientWidth) * video.duration)
      video.currentTime = scrubTime
    })
  }
}
