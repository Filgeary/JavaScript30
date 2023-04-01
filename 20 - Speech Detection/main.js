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
  recognition.interimResults = true
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
  let p = document.createElement('p')
  sectionElem.appendChild(p)

  recognition.addEventListener('result', evt => {
    const isFinal = evt.results[0]?.isFinal
    const { transcript: text } = evt.results[0][0]

    if (text === 'delete all') {
      Array.from(sectionElem.children).forEach(elem => elem.remove())
      return
    }
    if (text === 'stop') {
      isStopped = true
      recognition.stop()
      return
    }
    if (!isFinal) {
      p.textContent = text
    } else {
      p = document.createElement('p')
      sectionElem.appendChild(p)
    }
  })
}
