const express = require('express')
const app = express()
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer, {
  cors: { origin: ['http://localhost:3000'] },
})

const reversiHandler = require('./handlers/reversiHandler')
const battleshipHandler = require('./handlers/battleshipHanlder')

//* SETTINGS
app.set('port', process.env.PORT || 3001)

//* SOCKETS
reversiHandler(io.of('/reversi'))
battleshipHandler(io.of('/battleship'))

//* START SERVER
httpServer.listen(app.get('port'), () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32m',
    `Server listening on \x1b[4mhttp://localhost:${app.get('port')}\x1b[0m`,
    '\n\n'
  )
})
