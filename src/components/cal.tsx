import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../types';
import { getCalendarDays, isSameDay } from '../utils/dateUtils';
import DraggableEvent from './DraggableEvent';
import { WeatherIcon } from './Weathericon';
import { useWeather } from '../hooks/useWeather';
import { useHolidays } from '../hooks/useHolidays';

const floatingBoxStyles = `
@keyframes float-box {
  0% {
    transform: perspective(1000px) rotateX(1deg) rotateY(1deg) translateZ(10px);
  }
  50% {
    transform: perspective(1000px) rotateX(-1deg) rotateY(-1deg) translateZ(15px);
  }
  100% {
    transform: perspective(1000px) rotateX(1deg) rotateY(1deg) translateZ(10px);
  }
}`;

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
  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = floatingBoxStyles;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const calendarDays = getCalendarDays(selectedDate);
  const today = new Date();

  const handlePreviousMonth = () => {
    onDateSelect(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onDateSelect(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const getDayEvents = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(new Date(event.start), date));
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Card className="p-6 bg-stone-200 border-olive-600">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-stone-800">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePreviousMonth}
            className="bg-stone-300 hover:bg-stone-400 border-stone-400"
          >
            <ChevronLeft className="h-4 w-4 text-stone-600" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextMonth}
            className="bg-stone-300 hover:bg-stone-400 border-stone-400"
          >
            <ChevronRight className="h-4 w-4 text-stone-600" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className={`
              text-center p-2 font-medium text-sm
              ${day === 'Sun' || day === 'Sat' ? 'text-stone-600' : 'text-stone-700'}
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
          
          const delay = -(index * 0.05);
          const duration = 3 + (Math.random() * 0.5);

          return (
            <div
              key={index}
              onClick={() => onDateSelect(date)}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('scale-105');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('scale-105');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('scale-105');
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
                min-h-28 p-2 rounded-lg
                transform-gpu transition-all duration-300
                ${isCurrentMonth ? weekend ? 'bg-stone-100' : 'bg-stone-50' : 'bg-stone-200/50'}
                ${isTodayDate ? 'bg-olive-100 border-olive-600 border-2' : 'border border-stone-300'}
                ${isSelectedDate ? 'ring-2 ring-olive-500' : ''}
                hover:scale-105 cursor-pointer
                shadow-md hover:shadow-lg
                backdrop-blur-sm
              `}
              style={{
                animation: `float-box ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="flex justify-between items-start">
                <span className={`
                  text-sm font-medium
                  ${!isCurrentMonth ? 'text-stone-500' : weekend ? 'text-stone-700 font-semibold' : 'text-stone-700'}
                  ${isTodayDate ? 'text-olive-800' : ''}
                `}>
                  {date.getDate()}
                </span>
                {weather && (
                  <span 
                    className="flex items-center gap-1" 
                    title={`${weather.temperature}°C`}
                  >
                    <WeatherIcon 
                      condition={weather.condition} 
                      className="w-5 h-5 text-stone-600"
                    />
                    <span className="text-xs text-stone-600">
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