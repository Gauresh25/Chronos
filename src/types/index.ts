export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: Date | string;
    end: Date | string;
    color?: string;
    isAllDay?: boolean;
  }
  
  export interface CalendarDay {
    date: Date;
    events: CalendarEvent[];
    isCurrentMonth: boolean;
    isToday: boolean;
  }
  
  export interface CalendarState {
    events: CalendarEvent[];
    selectedDate: Date | string;
    view: 'month' | 'week' | 'day';
  }
  
  export interface DraggedEvent {
    event: CalendarEvent;
    sourceDate: Date;
  }