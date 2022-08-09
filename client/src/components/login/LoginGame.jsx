import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Form, ToggleButton } from 'react-bootstrap'

function LoginGame({ gameType, setGameType, formErrors }) {
  const gameTypeRadios = [
    { name: 'Reversi', value: 'reversi' },
    { name: 'Battleship', value: 'battleship' },
  ]

  return (
    <div className="mb-4">
      <Form.Label>Game</Form.Label>
      <ButtonGroup className="w-100">
        {gameTypeRadios.map(({ name, value }, i) => (
          <ToggleButton
            key={i}
            className="w-100"
            name="loginGameType"
            type="radio"
            variant="outline-dark"
            value={value}
            checked={gameType === value}
            onClick={() => setGameType(value)}
          >
            {name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <div className="text-danger">{formErrors.gameType}</div>
    </div>
  )
}

LoginGame.propTypes = {
  gameType: PropTypes.string.isRequired,
  setGameType: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
}

export default LoginGame
