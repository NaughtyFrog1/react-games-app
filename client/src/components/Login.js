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

export default function Login() {
  const [gameTypeSelected, setGameTypeSelected] = useState('')

  const gameTypeRadios = [
    { name: 'Reversi', value: 'reversi' },
    { name: 'Battleship', value: 'battleship' },
  ]

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
                  checked={gameTypeSelected === value}
                  onClick={() => setGameTypeSelected(value)}
                >
                  {name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <div className="text-dnager"></div>
          </div>
          <div className="mb-3">
            <Form.Label>Join to a game using a game id</Form.Label>
            <InputGroup>
              <Form.Control placeholder="Game ID" type="text" />
              <Button variant="dark" className="lh-1" type="button">
                <RightArrow style={{ width: '1em', height: '1em' }} />
              </Button>
            </InputGroup>
            <div className="text-dnager"></div>
          </div>
          <div className="mb-2">
            <Form.Label>
              Reconnect to a game using your player and game id
            </Form.Label>
            <InputGroup>
              <Form.Control placeholder="Game ID" type="text" />
              <Form.Control placeholder="Player ID" type="text" />
              <Button variant="dark" className="lh-1" type="button">
                <RightArrow style={{ width: '1em', height: '1em' }} />
              </Button>
            </InputGroup>
            <div className="text-danger"></div>
            <div className="text-danger"></div>
          </div>
          <p className="text-center mb-3 lh-1">or</p>
          <Button className="w-100 mb-2" variant="dark">
            Create a new game
          </Button>
        </Card.Body>
      </Card>
    </section>
  )
}
