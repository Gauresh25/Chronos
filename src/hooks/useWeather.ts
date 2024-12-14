import { useState, useEffect } from 'react';

export interface WeatherData {
  condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'wind';
  temperature: number;
}

export const useWeather = (selectedDate: Date) => {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});

  useEffect(() => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const conditions: WeatherData['condition'][] = ['clear', 'cloudy', 'rain', 'snow', 'storm', 'wind'];
    const weather: Record<string, WeatherData> = {};
    
    for (let day = 1; day <= daysInMonth; day++) {
      weather[`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day}`] = {
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        temperature: Math.floor(Math.random() * 30) + 10
      };
    }
    
    setWeatherData(weather);
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  const getWeather = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return weatherData[dateKey];
  };

  return { getWeather };
};