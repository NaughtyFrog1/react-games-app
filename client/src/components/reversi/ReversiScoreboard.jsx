import React from 'react'
import PropTypes from 'prop-types'
import ReversiPiece from './ReversiPiece'
import { Badge } from 'react-bootstrap'

function ReversiScoreboard({ turn, playerColor }) {
  const badgeYou = (
    <Badge
      pill
      bg="danger"
      className="position-absolute bottom-0 start-0 ms-2 mb-2"
    >
      You
    </Badge>
  )

  return (
    <div className="reversi-scoreboard d-flex gap-4" data-turn={turn}>
      <div className="reversi-scoreboard__player--black d-flex align-items-center gap-2 p-2 rounded-2 position-relative">
        <ReversiPiece className="piece--scoreboard" type="black" />
        <div className="fs-3 pe-2">{2}</div>
        {playerColor === 'black' && badgeYou}
      </div>

      <div className="reversi-scoreboard__player--white d-flex align-items-center gap-2 p-2 rounded-2 position-relative">
        <ReversiPiece className="piece--scoreboard" type="white" />
        <div className="fs-3 pe-2">{2}</div>
        {playerColor === 'white' && badgeYou}
      </div>
    </div>
  )
}

ReversiScoreboard.propTypes = {
  turn: PropTypes.oneOf(['black', 'white']).isRequired,
  playerColor: PropTypes.oneOf(['black', 'white']).isRequired,
}

export default ReversiScoreboard
