import React from 'react'

export default function Reversi({
  playerId,
  gameId,
  playerColor,
  initialTurn,
  initialIsPlayable,
  initialBoard,
}) {
  return (
    <>
      <pre>
        {JSON.stringify({
          playerId,
          gameId,
          playerColor,
          initialTurn,
          initialIsPlayable,
          initialBoard,
        }, null, 2)}
      </pre>
    </>
  )
}
