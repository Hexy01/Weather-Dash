import React from 'react';

export default function RecentSearches({ cities, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {cities.map((c, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(c)}
          className="bg-white bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
