import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext()

export const SOCKET_EMITERS = {
  REVERSI: {
    CREATE: 'reversi:create',
    JOIN: 'reversi:join',
    RECONNECT: 'reversi:reconnect',
    PLAY_TURN: 'reversi:playTurn'
  },
}

export const SOCKET_LISTENNERS = {
  LOGIN: {
    ERROR: 'login:error',
  },
  REVERSI: {
    CONNECTED: 'reversi:connected',
    PLAYER_CONNECTED: 'reversi:playerConnected',
    PLAYER_DISCONNECTED: 'reversi:playerDisconnected',
    TURN_PLAYED: 'reversi:turnPlayed',
    ERROR: 'reversi:error',
  },
}

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)
    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
