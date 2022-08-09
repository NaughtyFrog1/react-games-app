import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { SOCKET_EMITERS, useSocket } from 'contexts/SocketProvider'

function LoginCreate({ validateGameType, setFormErrors }) {
  const socket = useSocket()

  function handleCreate() {
    const errors = validateGameType()
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      socket.emit(SOCKET_EMITERS.REVERSI.CREATE)
    }
  }

  return (
    <>
      <p className="text-center mb-3 lh-1">or</p>
      <Button className="w-100 mb-2" variant="dark" onClick={handleCreate}>
        Create a new game
      </Button>
    </>
  )
}

LoginCreate.propTypes = {
  validateGameType: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
}

export default LoginCreate
