import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as RightArrow } from '../../assets/bs-arrow-right.svg'
import { isValidId } from '../../helpers/validators'

function LoginJoin({ validateGameType, formErrors, setFormErrors }) {
  const joinGameIdRef = useRef(null)

  function handleJoin() {
    setFormErrors(validateJoin())
  }

  function validateJoin() {
    const errors = validateGameType()
    if (joinGameIdRef.current.value === '') {
      errors.joinGameId = 'Game ID is required'
    } else if (!isValidId(joinGameIdRef.current.value)) {
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
          ref={joinGameIdRef}
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
