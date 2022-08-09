import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as RightArrow } from '../../assets/bs-arrow-right.svg'
import { isValidId } from '../../helpers/validators'

function LoginReconnect({ validateGameType, formErrors, setFormErrors }) {
  const reconnectGameIdRef = useRef(null)
  const reconnectPlayerIdRef = useRef(null)

  function handleReconnect() {
    setFormErrors(validateReconnect())
  }

  function validateReconnect() {
    const errors = validateGameType()
    if (reconnectGameIdRef.current.value === '') {
      errors.reconnectGameId = 'Game ID is required'
    } else if (!isValidId(reconnectGameIdRef.current.value)) {
      errors.reconnectGameId = 'Invalid Game ID'
    }
    if (reconnectPlayerIdRef.current.value === '') {
      errors.reconnectPlayerId = 'Player ID is required'
    } else if (!isValidId(reconnectPlayerIdRef.current.value)) {
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
          ref={reconnectGameIdRef}
        />
        <Form.Control
          placeholder="Player ID"
          type="text"
          name="reconnectPlayerId"
          ref={reconnectPlayerIdRef}
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
