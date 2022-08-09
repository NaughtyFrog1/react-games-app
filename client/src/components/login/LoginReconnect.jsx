import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as RightArrow } from 'assets/icons/bs-arrow-right.svg'
import { isValidId } from 'helpers/validators'
import { SOCKET_EMITERS, useSocket } from 'contexts/SocketProvider'

function LoginReconnect({ validateGameType, formErrors, setFormErrors }) {
  const gameIdRef = useRef(null)
  const playerIdRef = useRef(null)
  const socket = useSocket()

  function handleReconnect() {
    const errors = validateReconnect()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      socket.emit(
        SOCKET_EMITERS.REVERSI.RECONNECT,
        playerIdRef.current.value,
        gameIdRef.current.value
      )
    }
  }

  function validateReconnect() {
    const errors = validateGameType()
    if (gameIdRef.current.value === '') {
      errors.reconnectGameId = 'Game ID is required'
    } else if (!isValidId(gameIdRef.current.value)) {
      errors.reconnectGameId = 'Invalid Game ID'
    }
    if (playerIdRef.current.value === '') {
      errors.reconnectPlayerId = 'Player ID is required'
    } else if (!isValidId(playerIdRef.current.value)) {
      errors.reconnectPlayerId = 'Invalid Player ID'
    }
    return errors
  }

  return (
    <div className="mb-2">
      <Form.Label>Reconnect to a game using your player and game id</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="Game ID"
          type="text"
          name="reconnectGameId"
          ref={gameIdRef}
        />
        <Form.Control
          placeholder="Player ID"
          type="text"
          name="reconnectPlayerId"
          ref={playerIdRef}
        />
        <Button
          className="lh-1"
          variant="dark"
          type="button"
          onClick={handleReconnect}
        >
          <RightArrow />
        </Button>
      </InputGroup>
      <div className="text-danger">{formErrors.reconnectGameId}</div>
      <div className="text-danger">{formErrors.reconnectPlayerId}</div>
    </div>
  )
}

LoginReconnect.propTypes = {
  validateGameType: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  setFormErrors: PropTypes.func.isRequired,
}

export default LoginReconnect
