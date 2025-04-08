import React from 'react';

export default function Loader() {
  return (
    <div className="text-center mt-4">
      <div className="animate-spin h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
      <p>Fetching...</p>
    </div>
  );
}
