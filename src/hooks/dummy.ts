import { useCallback } from 'react';
import { CalendarEvent, CalendarState } from '../types';
import { isSameDay } from '../utils/dateUtils';
import { useLocalStorage } from './useLocalStorage';

const initialState: CalendarState = {
  events: [],
  selectedDate: new Date().toISOString(),
  view: 'month' as const
};

export const useCalendar = () => {
  const [state, setState] = useLocalStorage('calendar-state', initialState);

  const addEvent = useCallback((event: CalendarEvent) => {
    setState(prev => ({
      ...prev,
      events: [...prev.events, { ...event, id: crypto.randomUUID() }]
    }));
  }, [setState]);

  const updateEvent = useCallback((event: CalendarEvent) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === event.id ? event : e)
    }));
  }, [setState]);

  const deleteEvent = useCallback((eventId: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== eventId)
    }));
  }, [setState]);

  const getEventsForDay = useCallback((date: Date) => {
    return state.events.filter(event => 
      isSameDay(new Date(event.start), date)
    );
  }, [state.events]);

  const setSelectedDate = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      selectedDate: date.toISOString()
    }));
  }, [setState]);

  const setView = useCallback((view: CalendarState['view']) => {
    setState(prev => ({ ...prev, view }));
  }, [setState]);

  return {
    events: state.events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    })),
    selectedDate: new Date(state.selectedDate),
    view: state.view,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay,
    setSelectedDate,
    setView
  };
};