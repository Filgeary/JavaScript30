window.addEventListener('DOMContentLoaded', main)

function main() {
  const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog',
  ]
  const ul = document.querySelector('ul')
  if (!ul) return

  function checkOnArticle(str) {
    if (typeof str !== 'string') return

    if (/^[a|an|the]+\s/i.test(str)) {
      str = str.split(' ').slice(1).join(' ')
    }
    return str
  }

  const sorted = bands.slice().sort((a, b) => {
    let strA = checkOnArticle(a)
    let strB = checkOnArticle(b)

    return strA.localeCompare(strB)
  })

  const rawHtml = sorted.map(text => `<li>${text}</li>`).join('')
  ul.insertAdjacentHTML('beforeend', rawHtml)
}
