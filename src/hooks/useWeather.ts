import { useState, useEffect } from 'react';

export interface WeatherData {
  condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'wind';
  temperature: number;
}

interface VisualCrossingDay {
  datetime: string;
  temp: number;
  conditions: string;
  icon: string;
}

export const useWeather = (selectedDate: Date) => {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = import.meta.env.VITE_VISUALCROSSING_API_KEY || '';
      
      try {
        // Get first and last day of the month for the query
        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        
        const formatDate = (date: Date) => {
          return date.toISOString().split('T')[0];
        };

        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Mumbai/${formatDate(firstDay)}/${formatDate(lastDay)}?unitGroup=metric&key=${API_KEY}&contentType=json`
        );

        if (!response.ok || !API_KEY) {
          throw new Error('Weather API not configured or failed');
        }

        const data = await response.json();
        const newWeatherData: Record<string, WeatherData> = {};

        // Process API data
        data.days.forEach((day: VisualCrossingDay) => {
          const date = new Date(day.datetime);
          const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          
          newWeatherData[key] = {
            condition: mapCondition(day.icon),
            temperature: Math.round(day.temp)
          };
        });

        setWeatherData(newWeatherData);
      } catch (error) {
        // Fallback to random data
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        const conditions: WeatherData['condition'][] = ['clear', 'cloudy', 'rain', 'snow', 'storm', 'wind'];
        const fallbackData: Record<string, WeatherData> = {};

        for (let day = 1; day <= daysInMonth; day++) {
          fallbackData[`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day}`] = {
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            temperature: Math.floor(Math.random() * 30) + 10
          };
        }

        setWeatherData(fallbackData);
      }
    };

    fetchWeatherData();
  }, [selectedDate.getMonth(), selectedDate.getFullYear()]);

  // Map Visual Crossing conditions to our simplified conditions
  const mapCondition = (icon: string): WeatherData['condition'] => {
    switch (icon) {
      case 'clear-day':
      case 'clear-night':
        return 'clear';
      case 'cloudy':
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return 'cloudy';
      case 'rain':
      case 'showers-day':
      case 'showers-night':
        return 'rain';
      case 'snow':
      case 'snow-showers-day':
      case 'snow-showers-night':
        return 'snow';
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
        return 'storm';
      case 'wind':
      case 'fog':
        return 'wind';
      default:
        return 'clear';
    }
  };

  const getWeather = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return weatherData[dateKey];
  };

  return { getWeather };
};