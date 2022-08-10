import React from 'react'
import PropTypes from 'prop-types'
import ReversiPiece from './ReversiPiece'
import { SOCKET_EMITERS, useSocket } from 'contexts/SocketProvider'

function ReversiBoard({ playerColor, turn, isPlayable, board }) {
  const socket = useSocket()

  function handleClick(row, col) {
    if (isPlayable && playerColor === turn && board[row][col] === 'can-move') {
      socket.emit(SOCKET_EMITERS.REVERSI.PLAY_TURN, row, col)
    }
  }

  return board
    .flat()
    .map((type, i) => (
      <ReversiPiece
        key={i}
        type={type}
        onClick={() => handleClick(parseInt(i / 8), i % 8)}
      />
    ))
}

ReversiBoard.propTypes = {
  playerColor: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
  isPlayable: PropTypes.bool.isRequired,
  board: PropTypes.array.isRequired,
}

export default ReversiBoard
