'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector(':root')
  const rangeSpacing = document.querySelector('input[id="spacing"]')
  const rangeBlur = document.querySelector('input[id="blur"]')
  const colorPicker = document.querySelector('input[id="baseColor"]')

  const CSS_VAR = {
    spacing: '--spacing',
    blur: '--blur',
    baseColor: '--baseColor',
  }
  const isRootExist = root && root instanceof HTMLElement

  if (rangeSpacing && rangeSpacing instanceof HTMLInputElement) {
    rangeSpacing.addEventListener('input', evt => {
      if (evt && evt.target) {
        // @ts-ignore
        const value = +evt.target.value

        if (isRootExist) {
          root.style.setProperty(CSS_VAR.spacing, value + 'px')
        }
      }
    })
  }

  if (rangeBlur && rangeBlur instanceof HTMLInputElement) {
    rangeBlur.addEventListener('input', evt => {
      if (evt && evt.target) {
        // @ts-ignore
        const value = +evt.target.value

        if (isRootExist) {
          root.style.setProperty(CSS_VAR.blur, value + 'px')
        }
      }
    })
  }

  if (colorPicker && colorPicker instanceof HTMLElement) {
    colorPicker.addEventListener('input', evt => {
      if (evt && evt.target) {
        // @ts-ignore
        const value = evt.target.value

        if (isRootExist) {
          root.style.setProperty(CSS_VAR.baseColor, value)
        }
      }
    })
  }
})
