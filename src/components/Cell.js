import React from 'react'
import { useDrop } from 'react-dnd'

const Cell = ({ index }) => {

  const [, drop] = useDrop(() => ({
    accept: 'SHIP'
  }));

  return (
    <div ref={drop} id={'cell-' + index} className='cell'></div>
  )
}

export default Cell