const { customAlphabet } = require('nanoid')
const { ID_ALPHABET } = require('../constants/idsConstants')

const nanoid = customAlphabet(ID_ALPHABET)

function getNewUniqueId(size, callback) {
  let newId = nanoid(size)
  while (callback(newId)) newId = nanoid(size)
  return newId
}

module.exports = { getNewUniqueId }
