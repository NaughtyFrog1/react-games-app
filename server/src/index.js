const express = require('express')
const app = express()
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer, {
  cors: { origin: ['http://localhost:3000'] },
})

const {
  reversiHandler,
  reversiDisconnect,
} = require('./handlers/reversiHandler')

//* SETTINGS
app.set('port', process.env.PORT || 3001)

//* SOCKETS
io.on('connection', (socket) => {
  socket.data.gameType = ''
  socket.data.gameId = ''
  socket.data.playerId = ''

  reversiHandler(io, socket)

  socket.on('disconnect', () => {
    if (socket.data.gameType === 'reversi') reversiDisconnect(io, socket)
  })
})

//* START SERVER
httpServer.listen(app.get('port'), () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32m',
    `Server listening on \x1b[4mhttp://localhost:${app.get('port')}\x1b[0m`,
    '\n\n'
  )
})
