import React, { useEffect, useId } from 'react'
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import ShipDragLayer from './ShipDragLayer';

const Ship = ({ size }) => {
    const id = useId();
    const [, drag, dragPreview] = useDrag(() => ({
        type: 'SHIP',
        item: { id, type: 'ship' }
    }));

    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
            <ShipDragLayer shipId={id} size={size} />
            <img ref={drag} id={id} src="assets/images/ship.svg" alt='ship' className={'ship ' + size} />
        </>
    )
}

export default Ship;