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
        document.body.appendChild(ship);
        ship.className = `ship dropped-ship ${item.size}`;
        ship.style.left = firstCellPosition.x + 'px';
        ship.style.top = firstCellPosition.y + 'px';
        ship.style.transform = 'translateX(-50%)';
        ship.draggable = false;

        const rotate = document.getElementById(id).classList.contains("rotate");
        if (rotate) {
            const { height, width } = ship.getBoundingClientRect();
            ship.style.left = (firstCellRect.left + height / 2) + 'px';
            ship.style.top = (firstCellRect.top - width / 2 - (getRowsBySize(size) - 1) / 2 * firstCellRect.height) + 'px';
            ship.style.transformOrigin = "left";
            ship.style.transform = `rotate(90deg)`;
        }

        [...item.cells].forEach(cellId => document.getElementById(cellId).classList.add("ship-cell"));
    }

    return (
        <>
            <ShipDragLayer shipId={id} size={size} />
            <img ref={drag} id={id} src="assets/images/ship.svg" alt='ship' className={'ship ' + size} />
            <span onClick={e => {
                document.getElementById(id).classList.toggle("rotate");
            }}>Rotate</span>
        </>
    )
}

export default Ship;