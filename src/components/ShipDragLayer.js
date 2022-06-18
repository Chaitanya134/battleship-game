import React, { useRef, useEffect } from 'react'
import { useDragLayer } from 'react-dnd'

const ShipDragLayer = ({ shipId, size }) => {

    const shipDragLayerRef = useRef();
    const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    function getItemStyles(initialOffset, currentOffset) {
        if (!initialOffset || !currentOffset) {
            return {
                display: 'none',
            };
        }

        const { x, y } = currentOffset;
        const transform = `translate(${x}px, ${y}px)`;

        return {
            transform,
            WebkitTransform: transform
        }
    }

    function handleIntersection() {
        const shipRect = shipDragLayerRef.current.getBoundingClientRect();
        document.querySelectorAll(".cell").forEach(cell => {
            const cellRect = cell.getBoundingClientRect();
            const isOver = shipRect.left > cellRect.left &&
                            shipRect.right < cellRect.right &&
                            shipRect.top < (cellRect.bottom - cellRect.height / 2) &&
                            shipRect.bottom > (cellRect.top + cellRect.height / 2);
            cell.classList.toggle("over", isOver);
        })
    }

    useEffect(() => {
        if (isDragging && item.id === shipId) {
            const interval = setInterval(() => {
                handleIntersection();
            }, 200);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging])

    if (!isDragging || item.id !== shipId) return null;

    return (
        <div className='ship-drag-layer'>
            <img ref={shipDragLayerRef} src="assets/images/ship.svg" alt='ship' className={'ship ' + size}
                style={getItemStyles(initialOffset, currentOffset)} />
        </div>
    )
}

export default ShipDragLayer