window.addEventListener('DOMContentLoaded', main)

function main() {
  const wrapper = document.querySelector('.js-wrapper')
  if (!wrapper) return

  const voicesSelect = wrapper.querySelector('select')
  const rateInput = wrapper.querySelector('input[name="rate"]')
  const pitchInput = wrapper.querySelector('input[name="pitch"]')
  const textarea = wrapper.querySelector('textarea')
  const speakButton = wrapper.querySelector('#speak')
  const stopButton = wrapper.querySelector('#stop')
  if (!voicesSelect || !rateInput || !pitchInput || !textarea || !speakButton || !stopButton) return
  if (!(rateInput instanceof HTMLInputElement) || !(pitchInput instanceof HTMLInputElement)) return
  console.log('init')

  const speechSynthProp = window.speechSynthesis
  const speechService = new SpeechSynthesisUtterance()
  let voices = []
  let textShouldSpeak = textarea.value.trim() || ''

  textarea.addEventListener('change', function () {
    textShouldSpeak = this.value.trim()
  })

  // configure voice's selects
  speechSynthProp.addEventListener('voiceschanged', () => {
    voices = speechSynthProp.getVoices()
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'))
    const rawOptions = englishVoices
      .map(voice => {
        const { name, lang } = voice
        return `<option value="${name}">${name} / ${lang}</option>`
      })
      .join('')

    voicesSelect.insertAdjacentHTML('beforeend', rawOptions)
  })

  // setup voice
  voicesSelect.addEventListener('change', function () {
    if (this.value === '') return
    speechService.voice = voices.find(voice => voice.name === this.value)
  })

  // start speak
  speakButton.addEventListener('click', () => {
    speechService.text = textShouldSpeak
    const selectedOption = voicesSelect.selectedOptions[0].value
    speechService.voice = voices.find(voice => voice.name === selectedOption)
    speechService.rate = +rateInput.value
    speechService.pitch = +pitchInput.value
    speechSynthProp.speak(speechService)
  })

  // stop speak
  stopButton.addEventListener('click', () => {
    speechSynthProp.cancel()
  })
}
