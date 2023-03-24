window.addEventListener('DOMContentLoaded', init)

function init() {
  const images = document.querySelectorAll('img')

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const elem = entry.target
      if (entry.isIntersecting) elem.classList.add('active')
    })
  })

  images.forEach(elem => observer.observe(elem))
}
