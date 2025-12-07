import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeather, getWeatherType } from './services/weatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('Bhubaneswar'); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bgClass, setBgClass] = useState('app-container default');

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(city, signal);
        setWeather(data);
        const type = getWeatherType(data.weatherCode);
        setBgClass(`app-container ${type}`);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        setError(err.message);
        setWeather(null);
        setBgClass('app-container default');
      } finally {
        // Only turn off loading if not aborted (or check signal.aborted)
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    getWeather();

    // Auto-refresh every 60 seconds
    const intervalId = setInterval(() => {
      console.log('Auto-refreshing weather...');
      getWeather();
    }, 60000);

    // Cleanup function
    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [city]); // Dependency array ensures effect runs only when city changes

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className={bgClass}>
      <header className="app-header">
        <h1>Weather Dashboard</h1>
      </header>
      <main>
        <SearchInput onSearch={handleSearch} />
        <WeatherDisplay weather={weather} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
