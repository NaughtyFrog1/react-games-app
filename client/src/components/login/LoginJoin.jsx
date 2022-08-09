import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as RightArrow } from 'assets/icons/bs-arrow-right.svg'
import { isValidId } from 'helpers/validators'
import { SOCKET_EMITERS, useSocket } from 'contexts/SocketProvider'

function LoginJoin({ validateGameType, formErrors, setFormErrors }) {
  const gameIdRef = useRef(null)
  const socket = useSocket()

  function handleJoin() {
    const errors = validateJoin()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      socket.emit(SOCKET_EMITERS.REVERSI.JOIN, gameIdRef.current.value)
    }
  }

  function validateJoin() {
    const errors = validateGameType()
    if (gameIdRef.current.value === '') {
      errors.joinGameId = 'Game ID is required'
    } else if (!isValidId(gameIdRef.current.value)) {
      errors.joinGameId = 'Invalid Game ID'
    }
    return errors
  }

  return (
    <div className="mb-3">
      <Form.Label>Join to a game using a game id</Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="Game ID"
          type="text"
          name="joinGameId"
          ref={gameIdRef}
        />
        <Button
          className="lh-1"
          variant="dark"
          type="button"
          onClick={handleJoin}
        >
          <RightArrow />
        </Button>
      </InputGroup>
      <div className="text-danger">{formErrors.joinGameId}</div>
    </div>
  )
}

LoginJoin.propTypes = {
  validateGameType: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  setFormErrors: PropTypes.func.isRequired,
}

export default LoginJoin
