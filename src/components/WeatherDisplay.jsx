import React from 'react';
import { getWeatherDescription } from '../services/weatherService';

const getWeatherIcon = (code) => {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌈';
};

const WeatherDisplay = ({ weather, loading, error }) => {
  if (loading) {
    return <div className="weather-loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-placeholder">Enter a city to see the weather.</div>;
  }

  return (
    <div className="weather-card">
      <h2 className="city-name">{weather.city}, {weather.country}</h2>
      <div className="weather-main">
        <div className="weather-icon">{getWeatherIcon(weather.weatherCode)}</div>
        <div className="temperature">{weather.temperature}°C</div>
        <div className="condition">{getWeatherDescription(weather.weatherCode)}</div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
