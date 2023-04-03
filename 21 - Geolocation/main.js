window.addEventListener('DOMContentLoaded', main)

function main() {
  const arrowIcon = document.querySelector('.arrow')
  const speedValueElem = document.querySelector('.speed-value')
  if (!arrowIcon || !speedValueElem) return
  console.log('init')

  const geolocation = navigator.geolocation
  geolocation.watchPosition(
    geoPosition => getGeoPosition(geoPosition),
    err => console.error(err),
  )
  const format = value => (value ? parseInt(value) : '0')

  function getGeoPosition(geoPosition) {
    const { heading, latitude, longitude, speed } = geoPosition.coords || {}
    console.log({ heading, latitude, longitude, speed })

    // heading
    if (arrowIcon instanceof HTMLElement) {
      arrowIcon.style.transform = `rotate(${format(heading)}deg)`
    }

    // speed
    if (speedValueElem) speedValueElem.textContent = format(speed).toString()
  }
}
