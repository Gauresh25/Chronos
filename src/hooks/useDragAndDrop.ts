import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';

export const useDragAndDrop = (onEventUpdate: (event: CalendarEvent) => void) => {
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  const handleDragStart = useCallback((event: CalendarEvent) => {
    setDraggedEvent(event);
  }, []);

  const handleDrop = useCallback((targetDate: Date) => {
    if (!draggedEvent) return;

    // Calculate time difference between source and target dates
    const sourceDate = new Date(draggedEvent.start);
    const timeDiff = targetDate.getTime() - sourceDate.getTime();
    
    // Create updated event with new dates
    const updatedEvent = {
      ...draggedEvent,
      start: new Date(draggedEvent.start.getTime() + timeDiff),
      end: new Date(draggedEvent.end.getTime() + timeDiff),
    };

    onEventUpdate(updatedEvent);
    setDraggedEvent(null);
  }, [draggedEvent, onEventUpdate]);

  const handleDragEnd = useCallback(() => {
    setDraggedEvent(null);
  }, []);

  return {
    draggedEvent,
    handleDragStart,
    handleDrop,
    handleDragEnd
  };
};


