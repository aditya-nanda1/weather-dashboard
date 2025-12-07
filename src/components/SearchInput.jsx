import React, { useState, useEffect } from 'react';

const SearchInput = ({ onSearch }) => {
  const [city, setCity] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (city.trim()) {
        onSearch(city.trim());
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [city, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
    </form>
  );
};

export default SearchInput;
