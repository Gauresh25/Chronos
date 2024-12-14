import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../types';
import { getCalendarDays, isSameDay } from '../utils/dateUtils';
import DraggableEvent from './DraggableEvent';
import { WeatherIcon } from './WeatherIcon';
import { useWeather } from '../hooks/useWeather';
import { useHolidays } from '../hooks/useHolidays';

interface CalendarProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventUpdate: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  events,
  onDateSelect,
  onEventUpdate,
}) => {
  const { getWeather } = useWeather(selectedDate);
  const { isHoliday } = useHolidays(selectedDate);
  
  const calendarDays = getCalendarDays(selectedDate);
  const today = new Date();

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    onDateSelect(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    onDateSelect(newDate);
  };

  const getDayEvents = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(new Date(event.start), date));
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className={`
              text-center p-2 font-semibold text-sm
              ${day === 'Sun' || day === 'Sat' ? 'text-red-500' : ''}
            `}
          >
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => {
          const dayEvents = getDayEvents(date);
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
          const isTodayDate = isSameDay(date, today);
          const isSelectedDate = isSameDay(date, selectedDate);
          const weather = getWeather(date);
          const holiday = isHoliday(date);
          const weekend = isWeekend(date);

          return (
            <div
              key={index}
              onClick={() => onDateSelect(date)}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('bg-blue-50');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('bg-blue-50');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('bg-blue-50');
                
                try {
                  const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
                  const { event, sourceDate } = dragData;
                  
                  const sourceDateTime = new Date(sourceDate);
                  const timeDiff = date.getTime() - sourceDateTime.getTime();
                  
                  const updatedEvent = {
                    ...event,
                    start: new Date(new Date(event.start).getTime() + timeDiff),
                    end: new Date(new Date(event.end).getTime() + timeDiff),
                  };
                  
                  onEventUpdate(updatedEvent);
                } catch (error) {
                  console.error('Error dropping event:', error);
                }
              }}
              className={`
                min-h-28 p-1 border border-gray-200 relative
                ${isCurrentMonth ? weekend ? 'bg-gray-50' : 'bg-white' : 'bg-gray-100'}
                ${isTodayDate ? 'bg-blue-50 border-blue-500 font-semibold' : ''}
                ${isSelectedDate ? 'ring-2 ring-blue-500' : ''}
                hover:bg-gray-50 cursor-pointer
                transition-colors duration-200
              `}
            >
              <div className="flex justify-between items-start p-1">
                <span className={`text-sm ${weekend ? 'text-red-500 font-medium' : ''}`}>
                  {date.getDate()}
                </span>
                {weather && (
                  <span 
                    className="flex items-center gap-1" 
                    title={`${weather.temperature}°C`}
                  >
                    <WeatherIcon 
                      condition={weather.condition} 
                      className="w-5 h-5 text-gray-600"
                    />
                    <span className="text-xs text-gray-600">
                      {weather.temperature}°
                    </span>
                  </span>
                )}
              </div>
              
              {holiday && (
                <div 
                  className="mt-1 flex items-center gap-1 text-xs bg-red-50 text-red-700 p-1 rounded"
                  title={holiday}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="truncate">{holiday}</span>
                </div>
              )}

              <div className="space-y-1 mt-1">
                {dayEvents.map(event => (
                  <DraggableEvent
                    key={event.id}
                    event={event}
                    sourceDate={date}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Calendar;