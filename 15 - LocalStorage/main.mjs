window.addEventListener('DOMContentLoaded', main)

function main() {
  const form = document.querySelector('form')
  const ul = document.querySelector('ul')
  if (!form || !ul) return

  function getLocalStateAsArray() {
    const localState = localStorage.getItem('state')
    const res = localState ? JSON.parse(localState) : []
    return Array.isArray(res) ? res : null
  }
  const state = getLocalStateAsArray() ?? []

  function clearUlList(node) {
    if (node && node instanceof HTMLElement) {
      Array.from(node.children).forEach(elem => elem.remove())
    }
  }

  function initRender(dataset) {
    if (Array.isArray(dataset) && dataset.length) {
      const rawHtml = dataset.map(({ text, isChecked }) => createListItem(text, isChecked)).join('')
      clearUlList(ul)
      ul?.insertAdjacentHTML('afterbegin', rawHtml)
    }
  }
  initRender(state)

  function createListItem(text, isChecked) {
    return `
      <li>
        <input type="checkbox" id="${text}" ${isChecked ? 'checked' : ''}></input>
        <label for="${text}">${text}</label>
      </li>
    `
  }

  function updateState(state, idx) {
    if (Array.isArray(state) && state.length) {
      const obj = state[idx]
      if (obj && typeof obj === 'object') {
        obj.isChecked = !obj.isChecked
      }
    }
  }

  function updateLocalState(data) {
    localStorage.setItem('state', JSON.stringify(data))
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    if (!state.length) clearUlList(ul)

    const value = new FormData(this).get('item')
    const listItem = createListItem(value)
    ul.insertAdjacentHTML('beforeend', listItem)

    state.push({ text: value, isChecked: false })
    updateLocalState(state)

    this.reset()
  })

  ul.addEventListener('input', function (evt) {
    if (evt && evt.target instanceof HTMLInputElement) {
      const { id } = evt.target
      const idx = state.findIndex(elem => elem.text === id)

      if (idx > -1) {
        updateState(state, idx)
        updateLocalState(state)
      }
    }
  })
}
