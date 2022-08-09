const playersController = require('../controllers/playersController')
const roomsHandlers = require('./roomsHandlers')
const roomsController = require('../controllers/reversiRoomsController')
const gameController = require('../controllers/reversiGameController')

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

function reversiHandler(io, socket) {
  function emitConnected(playerId, gameId, game) {
    const socketsIds = playersController.getSockets(Object.values(game.players))
    const isPlayable = socketsIds.every((id) => id !== null)
    const playerColor = getKeyByValue(game.players, playerId)
    const board =
      game.turn === playerColor
        ? gameController.getBoardWithValidMoves(playerColor, game.board)
        : game.board

    socketsIds.forEach((socketId) => {
      if (socketId === socket.id) {
        io.to(socketId).emit(
          'reversi:connected',
          playerId,
          gameId,
          playerColor,
          game.turn,
          isPlayable,
          board
        )
      } else if (socketId !== null) {
        io.to(socketId).emit('reversi:playerConnected')
      }
    })
  }

  roomsHandlers(socket, 'reversi', roomsController, playersController, emitConnected)

  socket.on('reversi:playTurn', (row, col) => {
    console.log('reversi:playTurn', { socketId: socket.id, row, col })

    const game = roomsController.getGame(socket.data.gameId)
    const playerColor = getKeyByValue(game.players, socket.data.playerId)

    if (
      game.turn !== playerColor ||
      !gameController.isValidMove(playerColor, game.board, row, col)
    ) {
      socket.emit('reversi:error', ['Invalid move'])
      return
    }

    const newBoard = gameController.makeMove(playerColor, game.board, row, col)
    const newTurn = gameController.getTurn(playerColor, newBoard)
    const updatedGame = roomsController.updateGame(
      socket.data.gameId,
      newTurn,
      newBoard
    )
    const recipients = Object.entries(updatedGame.players).map(
      ([color, id]) => [color, ...playersController.getSockets([id])]
    )

    recipients.forEach(([color, socketId]) => {
      io.to(socketId).emit(
        'reversi:turnPlayed',
        updatedGame.turn,
        color === updatedGame.turn
          ? gameController.getBoardWithValidMoves(color, updatedGame.board)
          : updatedGame.board
      )
    })
  })
}

function reversiDisconnect(io, socket) {
  playersController.disconnect(socket.data.playerId)
  
  const game = roomsController.getGame(socket.data.gameId)
  const socketsIds = playersController.getSockets(Object.values(game.players))
  socketsIds.forEach((socketId) => {
    if (socketId !== null) {
      io.to(socketId).emit('reversi:playerDisconnected')
    }
  })
}

module.exports = { reversiHandler, reversiDisconnect }
