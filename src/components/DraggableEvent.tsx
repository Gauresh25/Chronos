import React from 'react';
import { CalendarEvent } from '../types';

interface DraggableEventProps {
  event: CalendarEvent;
  sourceDate: Date;
}

const DraggableEvent: React.FC<DraggableEventProps> = ({ event, sourceDate }) => {
  const handleDragStart = (e: React.DragEvent) => {
    // Store both event and source date
    const dragData = {
      event,
      sourceDate: sourceDate.toISOString()
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="text-xs p-1 rounded truncate cursor-move"
      style={{
        backgroundColor: event.color + '33',
        borderLeft: `3px solid ${event.color}`,
      }}
    >
      {event.title}
    </div>
  );
};

export default DraggableEvent;