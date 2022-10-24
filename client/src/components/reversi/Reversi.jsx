import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Reversi.scss'
import ReversiScoreboard from './ReversiScoreboard'
import ReversiAlert from './ReversiAlert'
import { SOCKET_LISTENNERS, useSocket } from 'contexts/SocketProvider'
import ReversiBoard from './ReversiBoard'
import GameInfo from 'components/ui/GameInfo'

function Reversi({
  playerId,
  gameId,
  playerColor,
  initialTurn,
  initialIsPlayable,
  initialBoard,
}) {
  const [turn, setTurn] = useState(initialTurn)
  const [isPlayable, setIsPlayable] = useState(initialIsPlayable)
  const [board, setBoard] = useState(initialBoard)
  const socket = useSocket()

  useEffect(() => {
    socket.on(
      SOCKET_LISTENNERS.REVERSI.PLAYER_CONNECTED,
      handleSocketPlayerConnected
    )
    socket.on(
      SOCKET_LISTENNERS.REVERSI.PLAYER_DISCONNECTED,
      handleSocketPlayerDisconnected
    )
    socket.on(SOCKET_LISTENNERS.REVERSI.TURN_PLAYED, handleSocketTurnPlayed)
    socket.on(SOCKET_LISTENNERS.REVERSI.ERROR, handleSocketError)

    return () => {
      socket.off(
        SOCKET_LISTENNERS.REVERSI.PLAYER_CONNECTED,
        handleSocketPlayerConnected
      )
      socket.off(
        SOCKET_LISTENNERS.REVERSI.PLAYER_DISCONNECTED,
        handleSocketPlayerDisconnected
      )
      socket.off(SOCKET_LISTENNERS.REVERSI.TURN_PLAYED, handleSocketTurnPlayed)
      socket.off(SOCKET_LISTENNERS.REVERSI.ERROR, handleSocketError)
    }
  }, [socket])

  function handleSocketPlayerConnected() {
    setIsPlayable(true)
  }

  function handleSocketPlayerDisconnected() {
    setIsPlayable(false)
  }

  function handleSocketTurnPlayed(newTurn, newBoard) {
    setTurn(newTurn)
    setBoard(newBoard)
  }

  function handleSocketError(error) {
    console.error(error)
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-evenly h-100">
      <div className="reversi-board position-relative">
        <ReversiBoard
          playerColor={playerColor}
          turn={turn}
          isPlayable={isPlayable}
          board={board}
        />
        <ReversiAlert
          playerColor={playerColor}
          isPlayable={isPlayable}
          turn={turn}
          className="position-absolute top-50 start-50 translate-middle text-center shadow"
        />
      </div>
      <ReversiScoreboard turn={turn} playerColor={playerColor} board={board} />
      <GameInfo playerId={playerId} gameId={gameId} />
    </div>
  )
}

Reversi.propTypes = {
  playerId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  playerColor: PropTypes.string.isRequired,
  initialTurn: PropTypes.string.isRequired,
  initialIsPlayable: PropTypes.bool.isRequired,
  initialBoard: PropTypes.array.isRequired,
}

export default Reversi
