module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('/battleship - new connection:', socket.id)
  
    socket.on('disconnect', () => {
      console.log('/battleship - disconnect:', socket.id)
    })
  })
}
