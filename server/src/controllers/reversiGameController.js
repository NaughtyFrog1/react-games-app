const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8
}

function cloneBoard(board) {
  return JSON.parse(JSON.stringify(board))
}

function getOpponenTile(tile) {
  return tile === 'black' ? 'white' : 'black'
}

function isValidMove(tile, board, rowStart, colStart) {
  if (
    !isValidPosition(rowStart, colStart) ||
    board[rowStart][colStart] !== ''
  ) {
    return false
  }

  const opponentTile = getOpponenTile(tile)
  return directions.some(([rowDirection, colDirection]) => {
    let row = rowStart
    let col = colStart
    do {
      row += rowDirection
      col += colDirection
    } while (isValidPosition(row, col) && board[row][col] === opponentTile)
    return (
      isValidPosition(row, col) &&
      board[row][col] === tile &&
      (row !== rowStart + rowDirection || col !== colStart + colDirection)
    )
  })
}

function getValidMoves(tile, board) {
  const validMoves = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      isValidMove(tile, board, row, col) && validMoves.push([row, col])
    }
  }
  return validMoves
}

function getBoardWithValidMoves(tile, board) {
  const clonedBoard = cloneBoard(board)
  getValidMoves(tile, clonedBoard).forEach(([row, col]) => {
    clonedBoard[row][col] = 'can-move'
  })
  return clonedBoard
}

function getTilesToFlip(tile, board, rowStart, colStart) {
  if (
    !isValidPosition(rowStart, colStart) ||
    board[rowStart][colStart] !== ''
  ) {
    return []
  }

  const opponentTile = getOpponenTile(tile)
  const tilesToFlip = []

  directions.forEach(([rowDirection, colDirection]) => {
    let row = rowStart
    let col = colStart
    do {
      row += rowDirection
      col += colDirection
    } while (isValidPosition(row, col) && board[row][col] === opponentTile)
    if (isValidPosition(row, col) && board[row][col] === tile) {
      row -= rowDirection
      col -= colDirection
      while (row !== rowStart || col !== colStart) {
        tilesToFlip.push([row, col])
        row -= rowDirection
        col -= colDirection
      }
    }
  })
  return tilesToFlip
}

function makeMove(tile, board, rowStart, colStart) {
  const clonedBoard = cloneBoard(board)
  const tilesToFlip = getTilesToFlip(tile, clonedBoard, rowStart, colStart)
  clonedBoard[rowStart][colStart] = tile
  tilesToFlip.forEach(([row, col]) => (clonedBoard[row][col] = tile))
  return clonedBoard
}

function getBoardScore(board) {
  let blackScore = 0
  let whiteScore = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === 'black') blackScore += 1
      else if (board[row][col] === 'white') whiteScore += 1
    }
  }
  return { blackScore, whiteScore }
}

function getTurn(currentTile, board) {
  const opponentTile = getOpponenTile(currentTile)
  if (getValidMoves(opponentTile, board).length !== 0) return opponentTile
  if (getValidMoves(currentTile, board).length !== 0) return currentTile

  const { blackScore, whiteScore } = getBoardScore(board)
  if (blackScore > whiteScore) return 'black win'
  if (whiteScore > blackScore) return 'white win'
  return 'draw'
}

module.exports = {
  isValidMove,
  getBoardWithValidMoves,
  makeMove,
  getTurn,
}
