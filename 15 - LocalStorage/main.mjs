window.addEventListener('DOMContentLoaded', main)

function main() {
  const form = document.querySelector('form')
  const ul = document.querySelector('ul')
  if (!form || !ul) return

  let state = []

  function getLocalState() {
    const localState = localStorage.getItem('state')
    return localState && JSON.parse(localState)
  }

  function clearUlList() {
    if (ul) Array.from(ul.children).forEach(elem => elem.remove())
  }

  function initRender() {
    state = getLocalState() ?? []

    if (Array.isArray(state) && state.length) {
      const rawHtml = state.map(({ text, isChecked }) => createListItem(text, isChecked)).join('')
      clearUlList()
      ul?.insertAdjacentHTML('afterbegin', rawHtml)
    }
  }
  initRender()

  function createListItem(text, isChecked) {
    return `
      <li>
        <input type="checkbox" id="${text}" ${isChecked ? 'checked' : ''}></input>
        <label for="${text}">${text}</label>
      </li>
    `
  }

  function updateState(idx, id, checked) {
    state = [
      ...state.slice(0, idx),
      {
        text: id,
        isChecked: checked,
      },
      ...state.slice(idx + 1),
    ]
  }

  function updateLocalState(data) {
    localStorage.setItem('state', JSON.stringify(data))
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    if (!state.length) clearUlList()

    const value = new FormData(this).get('item')
    const listItem = createListItem(value)
    ul.insertAdjacentHTML('beforeend', listItem)

    state.push({ text: value, isChecked: false })
    updateLocalState(state)

    this.reset()
  })

  ul.addEventListener('input', function (evt) {
    if (evt && evt.target instanceof HTMLInputElement) {
      const { id, checked } = evt.target
      const idx = state.findIndex(elem => elem.text === id)

      if (idx > -1) {
        updateState(idx, id, checked)
        updateLocalState(state)
      }
    }
  })
}
