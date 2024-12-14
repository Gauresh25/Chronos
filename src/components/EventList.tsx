import React from 'react';
import { CalendarEvent } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface EventListProps {
  date: Date;
  events: CalendarEvent[];
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({
  date,
  events,
  onEditEvent,
  onDeleteEvent,
}) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        Events for {formatDate(date)}
      </h3>
      {events.length === 0 ? (
        <p className="text-gray-500">No events scheduled</p>
      ) : (
        <div className="space-y-3">
          {events.map(event => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 border rounded-lg"
              style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
            >
              <div>
                <h4 className="font-medium">{event.title}</h4>
                {event.description && (
                  <p className="text-sm text-gray-600">{event.description}</p>
                )}
                <p className="text-xs text-gray-500">
                  {new Date(event.start).toLocaleTimeString()} - 
                  {new Date(event.end).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditEvent(event)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EventList;