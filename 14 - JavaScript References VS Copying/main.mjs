window.addEventListener('DOMContentLoaded', init)

function init() {
  // start with strings, numbers and booleans
  let age = 100
  let age2 = age
  console.log(age, age2)
  age = 200
  console.log(age, age2)

  let name = 'Wes'
  let name2 = name
  console.log(name, name2)
  name = 'wesley'
  console.log(name, name2)
  console.clear()

  // Let's say we have an array
  const players = ['Wes', 'Sarah', 'Ryan', 'Poppy']

  // and we want to make a copy of it.
  const team = players

  console.log(players, team)
  // You might think we can just do something like this:
  team[3] = 'Lux'

  // however what happens when we update that array?

  // now here is the problem!

  // oh no - we have edited the original array too!

  // Why? It's because that is an array reference, not an array copy. They both point to the same array!

  // So, how do we fix this? We take a copy instead!
  const team2 = players.slice()

  // one way
  console.log(team, team2)

  // or create a new array and concat the old one in
  const arr = []
  const team3 = arr.concat(players)
  console.log(team, team3)

  // or use the new ES6 Spread
  const team4 = [...players]
  team4[3] = 'boston'
  console.log(team, team4)

  const team5 = Array.from(players)
  console.log(team, team5)

  // now when we update it, the original one isn't changed

  // The same thing goes for objects, let's say we have a person object
  console.clear()

  // with Objects
  const person = {
    name: 'Wes Bos',
    age: 80,
  }

  // and think we make a copy:
  const captain = person
  captain.number = 99
  console.log(person, captain)

  // how do we take a copy instead?
  const cap2 = Object.assign({}, person, { number: 99, age: 12 })
  console.log(person, cap2)

  // We will hopefully soon see the object ...spread
  const cap3 = { ...person }
  console.log(person, cap3)

  // Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
  console.clear()

  const wes = {
    name: 'Wes',
    age: 100,
    social: {
      twitter: '@wesbos',
      facebook: 'wesbos.developer',
    },
  }

  const dev = Object.assign({}, wes)
  console.log(wes, dev)

  const dev2 = JSON.parse(JSON.stringify(wes))
  console.log(wes, dev2)
}
