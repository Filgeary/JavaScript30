// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
]

const people = [
  'Bernhard, Sandra',
  'Bethea, Erin',
  'Becker, Carl',
  'Bentsen, Lloyd',
  'Beckett, Samuel',
  'Blake, William',
  'Berger, Ric',
  'Beddoes, Mick',
  'Beethoven, Ludwig',
  'Belloc, Hilaire',
  'Begin, Menachem',
  'Bellow, Saul',
  'Benchley, Robert',
  'Blair, Robert',
  'Benenson, Peter',
  'Benjamin, Walter',
  'Berlin, Irving',
  'Benn, Tony',
  'Benson, Leana',
  'Bent, Silas',
  'Berle, Milton',
  'Berry, Halle',
  'Biko, Steve',
  'Beck, Glenn',
  'Bergman, Ingmar',
  'Black, Elk',
  'Berio, Luciano',
  'Berne, Eric',
  'Berra, Yogi',
  'Berry, Wendell',
  'Bevan, Aneurin',
  'Ben-Gurion, David',
  'Bevel, Ken',
  'Biden, Joseph',
  'Bennington, Chester',
  'Bierce, Ambrose',
  'Billings, Josh',
  'Birrell, Augustine',
  'Blair, Tony',
  'Beecher, Henry',
  'Biondo, Frank',
]

// helpers
function findElem(id) {
  return document.querySelector(`#s${id}`)
}

function createElem() {
  return document.createElement('p')
}

function render(id, content, shouldScroll) {
  const format = data => {
    if (Array.isArray(data)) {
      return data.map(x => '<pre>' + JSON.stringify(x, null, 2) + '</pre>').join('')
    }
    if (data && typeof data === 'object') {
      return '<pre>' + JSON.stringify(data, null, 2) + '</pre>'
    }
    return data
  }
  const newElem = createElem()
  newElem.innerHTML = format(content)
  const elem = findElem(id)
  elem?.appendChild(newElem)
  if (shouldScroll) elem?.scrollIntoView({ behavior: 'smooth' })
}

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const res1 = inventors.filter(x => x.year >= 1500 && x.year < 1600)
render(1, res1)

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const res2 = inventors.map(x => ({ first: x.first, last: x.last }))
render(2, res2)

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const res3 = inventors.slice().sort((a, b) => a.year - b.year)
render(3, res3)

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const res4 = inventors.reduce((acc, person) => acc + (person.passed - person.year), 0)
render(4, res4)

// 5. Sort the inventors by years lived
const res5 = inventors
  .slice()
  .sort((a, b) => b.passed - b.year - (a.passed - a.year))
  .map(person => ({ ...person, yearsLived: person.passed - person.year }))
render(5, res5)

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const res6 = inventors.map(person => 'de ' + person.last)
render(6, res6)

// sort Exercise
// 7. Sort the people alphabetically by last name
const res7 = people.slice().sort((a, b) => {
  const [lastNameA] = a.split(',')
  const [lastNameB] = b.split(',')

  return lastNameA.localeCompare(lastNameB)
})
render(7, res7)

// Reduce Exercise
// 8. Sum up the instances of each of these
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck',
]
const res8 = data.reduce(
  (acc, value) => (acc[value] ? { ...acc, [value]: acc[value] + 1 } : { ...acc, [value]: 1 }),
  {},
)
render(8, res8)
