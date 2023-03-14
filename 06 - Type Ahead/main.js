'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

  const inputElem = document.querySelector('body > form > input')
  const ulElem = document.querySelector('body > form > ul')

  const cities = []

  async function getData(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed status: ' + res.status)
      return await res.json()
    } catch (err) {
      throw new Error('Failed fetch', err)
    }
  }

  function mapData(arr) {
    if (arr && Array.isArray(arr)) {
      return arr.map(({ city, state, population }) => ({ city, state, population }))
    }
  }

  function setDataToState(state, data) {
    if (state && Array.isArray(state) && data && Array.isArray(data)) state.push(...data)
    return state
  }

  function filterData(query, { city, state }) {
    return city.toLowerCase().includes(query) || state.toLowerCase().includes(query)
  }

  function render(arr) {
    if (arr && Array.isArray(arr)) {
      arr.forEach(item => {
        const { city, state, population } = item

        const liElem = document.createElement('li')
        const spanTitle = document.createElement('span')
        const spanPopulation = document.createElement('span')

        spanTitle.textContent = `${city}, ${state}`
        spanTitle.classList.add('title')
        liElem.appendChild(spanTitle)

        spanPopulation.textContent = population
        spanPopulation.classList.add('population')
        liElem.appendChild(spanPopulation)

        ulElem?.appendChild(liElem)
      })
    }
  }

  function clear(nodeList) {
    if (nodeList && nodeList instanceof HTMLUListElement) {
      Array.from(nodeList.children).forEach(elem => elem.remove())
    }
  }

  getData(endpoint)
    .then(data => mapData(data))
    .then(data => setDataToState(cities, data))
    .catch(err => console.error(err))

  if (inputElem && inputElem instanceof HTMLInputElement) {
    inputElem.addEventListener('input', function () {
      if (this.value === '' || this.value === ' ') return

      const query = this.value.toLowerCase()
      const filtered = cities.filter(item => filterData(query, item))
      clear(ulElem)
      render(filtered)
    })
  }
})
