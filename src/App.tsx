import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCalendar } from "@/hooks/dummy";
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Calendar from "@/components/cal";
import EventList from '@/components/EventList';
import EventForm from '@/components/EventForm';
import ExportButton from '@/components/ExportButton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CalendarEvent } from '@/types';

const App = () => {
  // Initialize calendar state with local storage persistence
  const [storedEvents, setStoredEvents] = useLocalStorage<CalendarEvent[]>('calendar-events', []);
  
  // Calendar state management
  const {
    events,
    selectedDate,
    view,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay,
    setSelectedDate,
    setView
  } = useCalendar();

  // Event form state
  const [isEventFormOpen, setEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();

  // Drag and drop handling
  const { handleDragStart, handleDrop } = useDragAndDrop(updateEvent);

  // Event handlers
  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setEventFormOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventFormOpen(true);
  };

  const handleEventSubmit = (event: CalendarEvent) => {
    if (selectedEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setStoredEvents(events);
    setEventFormOpen(false);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setStoredEvents(events.filter(e => e.id !== selectedEvent.id));
      setEventFormOpen(false);
    }
  };

  const handleEventDrop = (event: CalendarEvent, date: Date) => {
    handleDrop(date);
    setStoredEvents(events);
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex gap-2">
            <ExportButton events={events} format="json" />
            <ExportButton events={events} format="csv" />
            <Button onClick={handleAddEvent} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <Calendar
              selectedDate={selectedDate}
              events={events}
              onDateSelect={setSelectedDate}
              onEventUpdate={updateEvent}
            />
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <EventList
              date={selectedDate}
              events={getEventsForDay(selectedDate)}
              onEditEvent={handleEditEvent}
              onDeleteEvent={deleteEvent}
            />
          </div>
        </div>

        {/* Event Form Dialog */}
        <EventForm
          event={selectedEvent}
          isOpen={isEventFormOpen}
          onClose={() => setEventFormOpen(false)}
          onSubmit={handleEventSubmit}
          onDelete={selectedEvent ? handleEventDelete : undefined}
          defaultDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default App;