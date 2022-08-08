module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('/reversi - new connection:', socket.id)
  
    socket.on('disconnect', () => {
      console.log('/reversi - disconnect:', socket.id)
    })
  })
}
