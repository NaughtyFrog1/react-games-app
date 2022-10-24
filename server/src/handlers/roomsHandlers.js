module.exports = (
  socket,
  gameType,
  roomsController,
  playersController,
  emitConnected
) => {
  function updateSocketData(playerId, gameId) {
    socket.data.gameType = gameType
    socket.data.playerId = playerId
    socket.data.gameId = gameId
  }

  function create() {
    console.log(`${gameType}:create`, { socketId: socket.id }, '\n')

    if (playersController.socketIsConnected(socket.id)) {
      socket.emit('login:error', ['You are already connected to a game'])
      return
    }

    const newPlayerId = playersController.add(socket.id)
    const newGameData = roomsController.createGame(newPlayerId)
    updateSocketData(newPlayerId, newGameData.id)
    emitConnected(newPlayerId, newGameData.id, newGameData.game)
  }

  function join(gameId) {
    console.log(`${gameType}:join`, { socketId: socket.id, gameId }, '\n')

    const errors = []
    if (playersController.socketIsConnected(socket.id)) {
      errors.push('You are already connected to a game')
    }
    if (!roomsController.gameExists(gameId)) {
      errors.push("The game doesn't exist")
    } else if (roomsController.gameIsFull(gameId)) {
      errors.push('The game is full')
    }
    if (errors.length !== 0) {
      socket.emit('login:error', errors)
      return
    }

    const newPlayerId = playersController.add(socket.id)
    const gameJoined = roomsController.joinGame(newPlayerId, gameId)
    updateSocketData(newPlayerId, gameId)
    emitConnected(newPlayerId, gameId, gameJoined)
  }

  function reconnect(playerId, gameId) {
    console.log(
      `${gameType}:reconnect`,
      { socketId: socket.id, playerId, gameId },
      '\n'
    )

    const errors = []
    if (playersController.socketIsConnected(socket.id)) {
      errors.push('You are already connected to a game')
    } else if (playersController.playerIsConnected(playerId)) {
      errors.push('The player is already connected')
    } else if (
      !playersController.playerExists(playerId) ||
      !roomsController.gameExists(gameId) ||
      !roomsController.playerExistsInGame(playerId, gameId)
    ) {
      errors.push('Wrong Player Id or Game Id')
    }
    if (errors.length !== 0) {
      socket.emit('login:error', errors)
      return
    }

    playersController.connect(playerId, socket.id)
    const game = roomsController.getGame(gameId)
    updateSocketData(playerId, gameId)
    emitConnected(playerId, gameId, game)
  }

  return { create, join, reconnect }
}
