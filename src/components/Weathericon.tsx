import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react';
import { WeatherData } from '../hooks/useWeather';

interface WeatherIconProps {
  condition: WeatherData['condition'];
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  className = "w-3 h-3" 
}) => {
  const icons = {
    'clear': <Sun className={className} />,
    'cloudy': <Cloud className={className} />,
    'rain': <CloudRain className={className} />,
    'snow': <CloudSnow className={className} />,
    'storm': <CloudLightning className={className} />,
    'wind': <Wind className={className} />
  };
  return icons[condition] || null;
};