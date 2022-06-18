import React, { useState, useEffect } from 'react'
import Cell from './Cell';

const Board = () => {
  const [boardSize, setBoardSize] = useState(10);

  useEffect(() => {
    document.getElementById("board").style.setProperty("--board-size", boardSize);
    setBoardSize(10);
  }, [boardSize])

  return (
    <section className='board-container'>
      <div id="board" className='board'>
        {
          Array(boardSize * boardSize).fill(0).map((_, index) => {
            return (
              <Cell key={index} />
            )
          })
        }
      </div>
    </section>
  )
}

export default Board