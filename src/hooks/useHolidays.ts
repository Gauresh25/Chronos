import { useState, useEffect } from 'react';

export const useHolidays = (selectedDate: Date) => {
  const [holidays, setHolidays] = useState<Record<string, string>>({});

  useEffect(() => {
    setHolidays({
      '2024-12-25': 'Christmas Day',
      '2024-12-31': "New Year's Eve",
      '2024-1-1': "New Year's Day",
      '2024-7-4': 'Independence Day',
    });
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  const isHoliday = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return holidays[dateKey];
  };

  return { isHoliday };
};