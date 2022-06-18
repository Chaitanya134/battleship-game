import React, { useEffect, useRef } from 'react'
import Ship from './Ship';
import { useDragLayer } from 'react-dnd/dist/hooks/useDragLayer';

const Ships = () => {
    const ghostRef = useRef();
    const { item, isDragging } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
    }));

    // useEffect(() => {
    //     if (isDragging) {
    //         console.log(item);
    //         // ghostRef.current.style.setProperty("--rows", rows);
    //         // ghostRef.current.style.setProperty("--cols", cols);
    //     }
    // }, [isDragging])

    function dragData(e, rows, cols) {
        ghostRef.current.style.setProperty("--rows", rows);
        ghostRef.current.style.setProperty("--cols", cols);
        e.dataTransfer.setDragImage(ghostRef.current, 0, 0);
        e.dataTransfer.setData("text/plain", JSON.stringify({ rows, cols }));
    }

    function handleDragStart(e) {
        const rows = e.target.getAttribute("data-rows");
        const cols = e.target.getAttribute("data-cols");
        dragData(e, rows, cols);
    }

    return (
        <>
            <h4>Ship Size</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
                <Ship size={"sm"} />
                <Ship size={"md"} />
                <Ship size={"lg"} />
                {/* <div className='ship' draggable={false} data-rows={1} data-cols={2} onDragStart={handleDragStart}>1*2</div>
                <div className='ship' draggable={false} data-rows={2} data-cols={4} onDragStart={handleDragStart}>2*4</div>
                <div className='ship' draggable={false} data-rows={1} data-cols={6} onDragStart={handleDragStart}>1*6</div>
                <div className='ship' draggable={false} data-rows={2} data-cols={9} onDragStart={handleDragStart}>2*9</div> */}
                <div className='ghost'></div>
            </div>
        </>
    )
}

export default Ships