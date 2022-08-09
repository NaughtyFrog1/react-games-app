import { ID_ALPHABET, ID_SIZE } from 'constants'

export function isValidId(id) {
  return (
    id.length === ID_SIZE && [...id].every((c) => ID_ALPHABET.includes(c))
  )
}
