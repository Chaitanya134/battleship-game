import React, { useEffect, useId } from 'react'
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ShipDragLayer from './ShipDragLayer';

const Ship = ({ size }) => {
    const id = useId();
    const [, drag, dragPreview] = useDrag(() => ({
        type: 'SHIP',
        item: { id, type: 'ship', size, rows: getRowsBySize(size), cells: [] },
        end: item => handleShipDrop(item)
    }));

    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getRowsBySize(size) {
        switch (size) {
            case "sm":
                return 2;
            case "md":
                return 4;
            case "lg":
                return 6;
            default:
                return 0;
        }
    }

    function handleShipDrop(item) {
        let canDrop = true;
        [...item.cells].forEach(cellId => {
            const cell = document.getElementById(cellId);
            if (cell.classList.contains("cannot-drop")) canDrop = false;
            cell.classList.remove("over", "cannot-drop");
        });

        if (item.cells.length < item.rows || !canDrop) return;

        // get position of the first cell
        const firstCell = document.getElementById(item.cells[0]);
        const firstCellRect = firstCell.getBoundingClientRect();
        const firstCellPosition = {
            x: firstCellRect.left + firstCellRect.width / 2,
            y: firstCellRect.top
        };

        // create a ship on the board
        const ship = document.getElementById(id).cloneNode();
        ship.className = `ship dropped-ship ${item.size}`;
        ship.style.left = firstCellPosition.x + 'px';
        ship.style.top = firstCellPosition.y + 'px';
        ship.style.transform = 'translateX(-50%)';
        ship.draggable = false;
        document.body.appendChild(ship);

        [...item.cells].forEach(cellId => document.getElementById(cellId).classList.add("ship-cell"));
    }

    return (
        <>
            <ShipDragLayer shipId={id} size={size} />
            <img ref={drag} id={id} src="assets/images/ship.svg" alt='ship' className={'ship ' + size}
                onDragEnd={() => {
                    // document.querySelectorAll(".cell").forEach(cell => {
                    //     cell.classList.remove("over");
                    // });
                    // console.log(item);
                    // const ship = document.createElement('div');
                    // ship.classList.add(["ship", "dropped-ship"]);
                    // document.getElementById("board").appendChild(ship);
                    // const { row, col } = getRowCol();
                }} />
        </>
    )
}

export default Ship;