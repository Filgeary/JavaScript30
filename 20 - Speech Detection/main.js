window.addEventListener('DOMContentLoaded', main)

function main() {
  const startControl = document.querySelector('button#start')
  const stopControl = document.querySelector('button#stop')
  const statusElem = document.querySelector('i')
  const sectionElem = document.querySelector('section')
  if (!startControl || !stopControl || !statusElem || !sectionElem) return

  // @ts-ignore
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  let isStopped = false

  // onstart
  startControl.addEventListener('click', () => recognition.start())
  recognition.addEventListener('start', () => (statusElem.textContent = 'Start Listening...'))

  // onend
  stopControl.addEventListener('click', () => recognition.stop())
  recognition.addEventListener('end', () => {
    if (!isStopped) recognition.start()
    else statusElem.textContent = 'Stopped!'
  })

  // onresult
  recognition.addEventListener('result', evt => {
    const results = evt.results[0][0]
    const text = results?.transcript

    if (text === 'delete all') {
      sectionElem.innerText = ''
      return
    }
    if (text === 'stop') {
      isStopped = true
      recognition.stop()
      return
    }
    sectionElem.innerText += text + '\n'
  })
}
