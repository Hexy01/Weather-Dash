import React from 'react';

export default function SearchBar({ city, setCity, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="flex-grow p-2 rounded text-black"
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={onSearch}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}