import React from 'react'
import PropTypes from 'prop-types'

function ReversiPiece({ type, className = '', onClick }) {
  return (
    <div
      className={`piece ${className}`}
      data-piece-type={type}
      onClick={onClick}
    >
      <div className="piece__inner">
        <div className="piece__black"></div>
        <div className="piece__white"></div>
      </div>
      <div className="piece__can-move"></div>
    </div>
  )
}

ReversiPiece.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default ReversiPiece
