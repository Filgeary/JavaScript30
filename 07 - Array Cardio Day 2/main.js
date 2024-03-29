'use strict'

{
  // ## Array Cardio Day 2

  const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 },
  ]

  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 },
  ]

  // Some and Every Checks
  // Array.prototype.some() // is at least one person 19 or older?
  const isSomePersonOlder18 = people.some(person => new Date().getFullYear() - person.year > 18)
  console.log('🚀 => isSomePersonOlder18:', isSomePersonOlder18)

  // Array.prototype.every() // is everyone 19 or older?
  const isEveryoneOlder18 = people.every(person => new Date().getFullYear() - person.year > 18)
  console.log('🚀 => isEveryoneOlder18:', isEveryoneOlder18)

  // Array.prototype.find()
  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423
  const commentWithId_823423 = comments.find(comment => comment.id === 823423)
  console.log('🚀 => commentWithId_823423:', commentWithId_823423)

  // Array.prototype.findIndex()
  // Find the comment with this ID
  // delete the comment with the ID of 823423
  const commentIdx = comments.findIndex(comment => comment.id === 823423)
  if (commentIdx > -1) {
    const copy = comments.slice()
    copy.splice(commentIdx, 1)
    console.table(copy)
  }
}
