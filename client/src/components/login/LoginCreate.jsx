import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

function LoginCreate({ validateGameType, setFormErrors }) {
  function handleCreate() {
    setFormErrors(validateGameType())
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
