import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap'
import { ReactComponent as RightArrow } from '../assets/bs-arrow-right.svg'
import { isValidId } from '../helpers/validators'

export default function Login() {
  const [formValues, setFormValues] = useState({
    gameType: '',
    joinGameId: '',
    reconnectGameId: '',
    reconnectPlayerId: '',
  })
  const [formErrors, setFormErrors] = useState({})

  const gameTypeRadios = [
    { name: 'Reversi', value: 'reversi' },
    { name: 'Battleship', value: 'battleship' },
  ]

  function handleInputChange(e) {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleRadioChange(newValue) {
    setFormValues((prev) => ({ ...prev, gameType: newValue }))
  }

  function handleCreate() {
    setFormErrors(validateGameType())
  }

  function handleJoin() {
    setFormErrors(validateJoin())
  }

  function handleReconnect() {
    setFormErrors(validateReconnect())
  }

  function validateGameType() {
    const errors = {}
    if (formValues.gameType === '') {
      errors.gameType = 'Choose the game you want to play'
    }
    return errors
  }

  function validateJoin() {
    const errors = validateGameType()
    if (formValues.joinGameId === '') {
      errors.joinGameId = 'Game ID is required'
    } else if (!isValidId(formValues.joinGameId)) {
      errors.joinGameId = 'Invalid Game ID'
    }
    return errors
  }

  function validateReconnect() {
    const errors = validateGameType()
    if (formValues.reconnectGameId === '') {
      errors.reconnectGameId = 'Game ID is required'
    } else if (!isValidId(formValues.reconnectGameId)) {
      errors.reconnectGameId = 'Invalid Game ID'
    }
    if (formValues.reconnectPlayerId === '') {
      errors.reconnectPlayerId = 'Player ID is required'
    } else if (!isValidId(formValues.reconnectPlayerId)) {
      errors.reconnectPlayerId = 'Invalid Player ID'
    }
    return errors
  }

  return (
    <section className="d-flex align-items-center histify-content-center h-100">
      <Card className="m-auto p-4 border-0" style={{ width: '460px' }}>
        <Card.Body>
          <Card.Title className="mb-4 fs-1">React Games App</Card.Title>
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
                  checked={formValues.gameType === value}
                  onClick={() => handleRadioChange(value)}
                >
                  {name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <div className="text-danger">{formErrors.gameType}</div>
          </div>
          <div className="mb-3">
            <Form.Label>Join to a game using a game id</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Game ID"
                type="text"
                name="joinGameId"
                value={formValues.joinGameId}
                onInput={handleInputChange}
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
          <div className="mb-2">
            <Form.Label>
              Reconnect to a game using your player and game id
            </Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Game ID"
                type="text"
                name="reconnectGameId"
                value={formValues.reconnectGameId}
                onInput={handleInputChange}
              />
              <Form.Control
                placeholder="Player ID"
                type="text"
                name="reconnectPlayerId"
                value={formValues.reconnectPlayerId}
                onInput={handleInputChange}
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
          <p className="text-center mb-3 lh-1">or</p>
          <Button className="w-100 mb-2" variant="dark" onClick={handleCreate}>
            Create a new game
          </Button>
          <div className="text-danger"></div>
        </Card.Body>
      </Card>
    </section>
  )
}
