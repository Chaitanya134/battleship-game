import React, { useState, useEffect } from 'react'

const Board = () => {
  const [boardSize, setBoardSize] = useState(10);

  useEffect(() => {
    document.getElementById("board").style.setProperty("--board-size", boardSize);
    setBoardSize(12);
  }, [boardSize])

  function handleClick(e) {
    if (e.target.classList.contains("shoot")) {
      alert("You already hit this spot!");
    }
    e.target.classList.add("shoot");

    if (e.target.classList.contains("ship")) {
      e.target.classList.add("hit");
    } else {
      e.target.classList.add("miss");
    }
  }

  return (
    <section className='board-container'>
      <div id="board" className='board'>
        {
          Array(boardSize * boardSize).fill(0).map((_, index) => {
            return (
              <div key={index} className={index < 12 && index % 5 ? 'cell ship' : 'cell'} 
              onClick={handleClick}>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Board