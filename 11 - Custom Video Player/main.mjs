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
        const value = Number(this.dataset.skip)
        const currentTime = Math.floor(video.currentTime)
        video.currentTime = Math.max(currentTime + value, 0)
      })
    }
  })

  // progress
  function updateProgress() {
    let diff, ratio
    if (video) {
      const { duration, currentTime } = video
      diff = Math.floor(duration - currentTime)
      ratio = (100 - (diff / duration) * 100).toFixed(2)
    }
    if (progressBar instanceof HTMLElement) {
      progressBar.style.flexBasis = `${ratio}%`
    }
  }
  video.addEventListener('loadeddata', () => setInterval(updateProgress, 1000))
}
