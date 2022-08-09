import React, { useState } from 'react'
import Login from 'components/login/Login'
import Reversi from 'components/reversi/Reversi'
import { SocketProvider } from 'contexts/SocketProvider'

export default function App() {
  const [page, setPage] = useState('login')

  let currentPage
  if (page === 'login') {
    currentPage = <Login />
  } else if (page === 'reversi') {
    currentPage = <Reversi />
  }

  return <SocketProvider>{currentPage}</SocketProvider>
}
