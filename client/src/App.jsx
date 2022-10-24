import React, { useCallback, useEffect, useState } from 'react'
import Login from 'components/login/Login'
import Reversi from 'components/reversi/Reversi'
import { SOCKET_LISTENNERS, useSocket } from 'contexts/SocketProvider'

export default function App() {
  const [page, setPage] = useState(<Login />)
  const socket = useSocket()

  const showReversiPage = useCallback(
    ({ playerId, gameId, playerColor, turn, isPlayable, board }) => {
      setPage(
        <Reversi
          playerId={playerId}
          gameId={gameId}
          playerColor={playerColor}
          initialTurn={turn}
          initialIsPlayable={isPlayable}
          initialBoard={board}
        />
      )
    },
    [setPage]
  )

  useEffect(() => {
    if (socket == null) return
    socket.on(SOCKET_LISTENNERS.REVERSI.CONNECTED, showReversiPage)
    return () =>
      socket.off(SOCKET_LISTENNERS.REVERSI.CONNECTED, showReversiPage)
  }, [socket, showReversiPage])

  return page
}
