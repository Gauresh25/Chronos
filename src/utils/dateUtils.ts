export const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };
  
  export const getCalendarDays = (date: Date): Date[] => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const endingDayOfWeek = lastDayOfMonth.getDay();
    
    const previousMonthDays = Array.from({ length: startingDayOfWeek }, (_, i) => {
      return new Date(date.getFullYear(), date.getMonth(), -i);
    }).reverse();
    
    const currentMonthDays = getDaysInMonth(date);
    
    const nextMonthDays = Array.from({ length: 6 - endingDayOfWeek }, (_, i) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, i + 1);
    });
    
    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };
  
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };