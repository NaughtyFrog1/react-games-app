const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

//* SETTINGS
app.set('port', process.env.PORT || 3001);

//* MIDDLEWARES
app.use(express.static('public'));

//* SOCKET
io.on('connect', (socket) => {
  console.log(socket.id)
});

//* START SERVER
httpServer.listen(app.get('port'), () => {
  console.log(
    '\n\x1b[1m>>> \x1b[32m',
    `Server listening on \x1b[4mhttp://localhost:${app.get('port')}\x1b[0m`,
    '\n\n'
  );
});
