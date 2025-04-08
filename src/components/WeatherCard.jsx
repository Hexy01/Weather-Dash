import React from 'react';

export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg shadow-md mt-4 text-center">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <img
        className="mx-auto"
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
      <p className="text-xl">{Math.round(main.temp)}°C - {weather[0].main}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>
    </div>
  );
}