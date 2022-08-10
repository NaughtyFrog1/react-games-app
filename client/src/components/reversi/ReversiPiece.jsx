import React from 'react'
import PropTypes from 'prop-types'

function ReversiPiece({ type, className = '' }) {
  return (
    <div className={`piece ${className}`} data-piece-type={type}>
      <div className="piece__inner">
        <div className="piece__black"></div>
        <div className="piece__white"></div>
      </div>
      <div className="piece__can-move"></div>
    </div>
  )
}

ReversiPiece.propTypes = {
  type: PropTypes.oneOf(['', 'black', 'white', 'can-move']).isRequired,
  className: PropTypes.string,
}

export default ReversiPiece
