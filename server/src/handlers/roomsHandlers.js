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

  socket.on(`${gameType}:create`, () => {
    if (playersController.socketIsConnected(socket.id)) {
      socket.emit('login:error', ['You are already connected to a game'])
      return
    }

    const newPlayerId = playersController.add(socket.id)
    const newGameData = roomsController.createGame(newPlayerId)
    updateSocketData(newPlayerId, newGameData.id)
    emitConnected(newPlayerId, newGameData.id, newGameData.game)
  })

  socket.on(`${gameType}:join`, (gameId) => {
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
  })

  socket.on(`${gameType}:reconnect`, (playerId, gameId) => {
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
  })
}
