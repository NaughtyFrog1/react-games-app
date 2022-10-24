const path = require('path')
const { ID_SIZE } = require('../constants/idsConstants')
const {
  createJsonFile,
  readJsonFile,
  writeJsonFile,
} = require('../helpers/files.helper')
const { getNewUniqueId } = require('../helpers/ids.helper')

const DIR_REVERSI = path.join(__dirname, '..', 'data', 'reversi.json')

createJsonFile(DIR_REVERSI, {})

function createGame(playerId) {
  const newGame = {
    players: {
      black: playerId,
      white: '',
    },
    turn: 'black',
    board: [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', 'white', 'black', '', '', ''],
      ['', '', '', 'black', 'white', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ],
  }
  const games = readJsonFile(DIR_REVERSI)
  const newId = getNewUniqueId(ID_SIZE, (id) => games.hasOwnProperty(id))
  games[newId] = newGame
  writeJsonFile(DIR_REVERSI, games)
  return { id: newId, game: newGame }
}

function joinGame(playerId, gameId) {
  const games = readJsonFile(DIR_REVERSI)
  games[gameId].players.white = playerId
  writeJsonFile(DIR_REVERSI, games)
  return games[gameId]
}

function getGame(gameId) {
  return readJsonFile(DIR_REVERSI)[gameId]
}

function updateGame(gameId, turn, board) {
  const games = readJsonFile(DIR_REVERSI)
  games[gameId].turn = turn
  games[gameId].board = board
  writeJsonFile(DIR_REVERSI, games)
  return games[gameId]
}

function deleteGame(gameId) {
  const games = readJsonFile(DIR_REVERSI)
  delete games[gameId]
  writeJsonFile(DIR_REVERSI, games)
}

function playerExistsInGame(playerId, gameId) {
  const game = readJsonFile(DIR_REVERSI)[gameId]
  return Object.values(game.players).includes(playerId)
}

function gameExists(gameId) {
  return readJsonFile(DIR_REVERSI).hasOwnProperty(gameId)
}

function gameIsFull(gameId) {
  const { players } = readJsonFile(DIR_REVERSI)[gameId]
  return Object.values(players).every((p) => p !== '')
}

module.exports = {
  createGame,
  joinGame,
  getGame,
  updateGame,
  // deleteGame,
  playerExistsInGame,
  gameExists,
  gameIsFull,
}
