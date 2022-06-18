import React from 'react'
import { useDrop } from 'react-dnd'

const Cell = () => {

  const [, drop] = useDrop(() => ({
    accept: 'SHIP',
    drop: (item, monitor) => {
      document.querySelectorAll(".cell").forEach(cell => {
        if (cell.classList.contains("over")) {
          cell.classList.add("ship-cell");
        }
        cell.classList.remove("over");
      });
    },
    canDrop: () => canDropShip()
  }));

  function canDropShip() {
    document.querySelectorAll(".cell").forEach(cell => {
      const cannotDrop = cell.classList.contains("over") && cell.classList.contains("ship-cell");
      cell.classList.toggle("cannot-drop", cannotDrop);
      if (cannotDrop) {
        console.log("cannot drop");
        return false;
      }
    });
    return true;
  }

  return (
    <div ref={drop} className='cell'></div>
  )
}

export default Cell