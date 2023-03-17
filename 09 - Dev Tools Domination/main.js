'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const p = document.querySelector('p')
  p?.addEventListener('click', makeGreen)

  function makeGreen() {
    if (!p) return

    p.style.color = '#BADA55'
    p.style.fontSize = '50px'
  }

  const dogs = [
    { name: 'Snickers', age: 2 },
    { name: 'hugo', age: 8 },
  ]

  // Regular
  console.log('Regular log')

  // Interpolated
  console.log('Interpolated %s', 'String')

  // Styled
  console.log('%cStyled', 'color: tomato')

  // warning!
  console.warn('Warning log')

  // Error :|
  console.error('Error log')

  // Info
  console.info('Info log')

  // Testing
  console.assert(1 === 1, 'True: 1 === 1')
  console.assert(1 === 2 + 2, 'False: 1 !== 2 + 2')

  // clearing
  console.clear()

  // Viewing DOM Elements
  console.dir(p)

  // Grouping together
  dogs.forEach(dog => {
    console.group(dog.name)
    console.log(`${dog.name} is ${dog.age} years old`)
    console.groupEnd()
  })
  console.clear()

  // counting
  dogs.forEach(item => {
    console.count('dog')
    console.log(item)
  })
  console.clear()

  // Table
  console.table(dogs)
  console.clear()

  // timing
  console.time('Fetching')
  fetch('https://jsonplaceholder.typicode.com/todos/2')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
    .finally(() => postMessage())

  console.timeEnd('Fetching')

  const postMessage = () => console.log('%cCONGRATS !!!', 'font-size: 32px; color: tomato')
})
