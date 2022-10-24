import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function GameInfo({ gameId, playerId }) {
  const overlayPlayerId = (
    <Tooltip>
      This is your <b>Player ID</b>, <u>keep it private</u> and use it to
      reconnect to this game.
    </Tooltip>
  )

  const overlayGameId = (
    <Tooltip>
      This is the <b>Game ID</b>, <u>share it</u> with the person you want to
      play and use it to reconnect to this game.
    </Tooltip>
  )

  return (
    <div className="fixed-bottom p2 d-flex gap-3 justify-content-evenly small">
      <OverlayTrigger overlay={overlayPlayerId}>
        <p className="mb-0 font-monospace">
          <strong>Player ID:</strong> {playerId}
        </p>
      </OverlayTrigger>
      <OverlayTrigger overlay={overlayGameId}>
        <p className="mb-0 font-monospace">
          <strong>Game ID:</strong> {gameId}
        </p>
      </OverlayTrigger>
    </div>
  )
}

export default GameInfo
