import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReversiPiece from './ReversiPiece'
import './Reversi.scss'
import ReversiScoreboard from './ReversiScoreboard'

function Reversi({
  playerId,
  gameId,
  playerColor,
  initialTurn,
  initialIsPlayable,
  initialBoard,
}) {
  const [turn, setTurn] = useState(initialTurn)
  const [board, setBoard] = useState(initialBoard)

  return (
    <div className="d-flex flex-column align-items-center justify-content-evenly h-100">
      <div className="reversi-board">
        {board.flat().map((type, i) => (
          <ReversiPiece key={i} type={type} />
        ))}
      </div>
      <ReversiScoreboard turn={turn} playerColor={playerColor} />
    </div>
  )
}

Reversi.propTypes = {
  playerId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  playerColor: PropTypes.oneOf(['black', 'white']).isRequired,
  initialTurn: PropTypes.oneOf(['black', 'white']).isRequired,
  initialIsPlayable: PropTypes.bool.isRequired,
  initialBoard: PropTypes.array.isRequired,
}

export default Reversi
