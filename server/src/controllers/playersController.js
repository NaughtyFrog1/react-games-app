const path = require('path')
const { ID_SIZE } = require('../constants/idsConstants')
const {
  createJsonFile,
  readJsonFile,
  writeJsonFile,
} = require('../helpers/files.helper')
const { getNewUniqueId } = require('../helpers/ids.helper')

const DIR_PLAYERS = path.join(__dirname, '..', 'data', 'players.json')
const connectedPlayers = {}

createJsonFile(DIR_PLAYERS, [])

function add(socketId) {
  const players = readJsonFile(DIR_PLAYERS)
  const newId = getNewUniqueId(ID_SIZE, (id) => players.includes(id))
  players.push(newId)
  writeJsonFile(DIR_PLAYERS, players)
  connectedPlayers[newId] = socketId
  return newId
}

function remove(playerId) {
  const players = readJsonFile(DIR_PLAYERS)
  writeJsonFile(
    DIR_PLAYERS,
    players.filter((p) => p !== playerId)
  )
}

function connect(playerId, socketId) {
  connectedPlayers[playerId] = socketId
}

function disconnect(playerId) {
  delete connectedPlayers[playerId]
}

function playerExists(playerId) {
  return readJsonFile(DIR_PLAYERS).includes(playerId)
}

function playerIsConnected(playerId) {
  return connectedPlayers.hasOwnProperty(playerId)
}

function socketIsConnected(socketId) {
  return Object.values(connectedPlayers).includes(socketId)
}

function getSockets(playersIds) {
  return playersIds.map((playerId) => connectedPlayers[playerId] ?? null)
}

module.exports = {
  add,
  // remove,
  connect,
  disconnect,
  playerExists,
  playerIsConnected,
  socketIsConnected,
  getSockets,
}
