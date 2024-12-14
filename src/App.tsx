import React, { useState } from 'react';
import Calendar from './components/cal';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import { useCalendar } from './hooks/dummy';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ExportButton from './components/ExportButton';

const App = () => {
  const {
    events,
    selectedDate,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay,
    setSelectedDate,
  } = useCalendar();

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleEventSubmit = (event) => {
    if (selectedEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setIsEventFormOpen(false);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsEventFormOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-300 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-stone-800">Calendar</h1>
          <div className="flex gap-4">
            <ExportButton events={events} format="csv" />
            <ExportButton events={events} format="json" />
             <Button onClick={handleAddEvent} className="gap-2 hover:bg-olive-700 text-white px-8 text-lg shadow-lg hover:shadow-xl transition-all">
              <Plus className=" w-4" />
              Add Event
            </Button> 
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <Calendar
            selectedDate={selectedDate}
            events={events}
            onDateSelect={setSelectedDate}
            onEventUpdate={updateEvent}
          />
          <EventList
            date={selectedDate}
            events={getEventsForDay(selectedDate)}
            onEditEvent={handleEditEvent}
            onDeleteEvent={deleteEvent}
          />
        </div>

        <EventForm
          event={selectedEvent}
          defaultDate={selectedDate}
          isOpen={isEventFormOpen}
          onClose={() => setIsEventFormOpen(false)}
          onSubmit={handleEventSubmit}
          onDelete={selectedEvent ? handleEventDelete : undefined}
        />
      </div>
    </div>
  );
};

export default App;