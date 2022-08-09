import React, { useEffect, useState, useCallback } from 'react'
import { Card } from 'react-bootstrap'
import { SOCKET_LISTENNERS, useSocket } from 'contexts/SocketProvider'
import LoginCreate from './LoginCreate'
import LoginGame from './LoginGame'
import LoginJoin from './LoginJoin'
import LoginReconnect from './LoginReconnect'

export default function Login() {
  const [gameType, setGameType] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const socket = useSocket()

  const showServerErrors = useCallback((errors) => {
    setFormErrors({ server: errors.join('\n') })
  }, [setFormErrors])

  useEffect(() => {
    if (socket == null) return
    socket.on(SOCKET_LISTENNERS.LOGIN.ERROR, showServerErrors)
    return () => socket.off(SOCKET_LISTENNERS.LOGIN.ERROR, showServerErrors)
  }, [socket, showServerErrors])

  function validateGameType() {
    const errors = {}
    if (gameType === '') {
      errors.gameType = 'Choose the game you want to play'
    }
    return errors
  }

  return (
    <section className="d-flex align-items-center histify-content-center h-100">
      <Card className="m-auto p-4 border-0" style={{ width: '460px' }}>
        <Card.Body>
          <Card.Title className="mb-4 fs-1">React Games App</Card.Title>
          <LoginGame
            gameType={gameType}
            setGameType={setGameType}
            formErrors={formErrors}
          />
          <LoginJoin
            validateGameType={validateGameType}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
          <LoginReconnect
            validateGameType={validateGameType}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
          <LoginCreate
            validateGameType={validateGameType}
            setFormErrors={setFormErrors}
          />
          <div className="text-danger">{formErrors.server}</div>
        </Card.Body>
      </Card>
    </section>
  )
}
