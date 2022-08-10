import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

function ReversiAlert({ playerColor, turn, isPlayable, className }) {
  console.log('ReversiAlert - render')

  let variant
  let message
  let show = true
  
  if (turn === 'draw') {
    variant = 'warning'
    message = "It's a draw!"
  } else if (
    (playerColor === 'black' && turn === 'black win') ||
    (playerColor === 'white' && turn === 'white win')
  ) {
    variant = 'success'
    message = 'You win!'
  } else if (turn !== 'black' && turn !== 'white') {
    variant = 'danger'
    message = 'You lose!'
  } else if (!isPlayable) {
    variant = 'dark'
    message = 'Waiting for another player'
  } else {
    show = false
  }

  return (
    <Alert show={show} variant={variant} className={className}>
      {message}
    </Alert>
  )
}

ReversiAlert.propTypes = {
  playerColor: PropTypes.string.isRequired,
  turn: PropTypes.string.isRequired,
  isPlayable: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ReversiAlert
