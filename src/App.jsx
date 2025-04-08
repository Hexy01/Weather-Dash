// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const updateRecentSearches = (city) => {
    const updated = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed60b24188abc0105a6ce3f100c783c9&units=metric`
      );
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ed60b24188abc0105a6ce3f100c783c9&units=metric`
      );
      const filtered = forecastRes.data.list.filter(item => item.dt_txt.includes("12:00:00"));
      setForecast(filtered);

      updateRecentSearches(city);
    } catch (err) {
      setError("City not found");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clouds': return '☁️';
      case 'Rain': return '🌧️';
      case 'Clear': return '☀️';
      case 'Snow': return '❄️';
      case 'Thunderstorm': return '🌩️';
      case 'Drizzle': return '🌦️';
      case 'Mist': return '🌫️';
      default: return '🌍';
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageContainer}>
        <h1 style={styles.title}><span style={styles.icon}>⛅</span> Weather Snap</h1>
        <div style={styles.cardContainer}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city"
              style={styles.input}
            />
            <button onClick={fetchWeather} style={styles.button}>Search</button>
          </div>
          {recentSearches.length > 0 && (
            <div style={styles.recentContainer}>
              <p style={{ margin: 0 }}>Recent Searches:</p>
              <ul style={styles.recentList}>
                {recentSearches.map((item, idx) => (
                  <li key={idx} style={styles.recentItem} onClick={() => { setCity(item); fetchWeather(); }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {weather && (
            <div style={styles.weatherCard}>
              <div style={styles.weatherHeader}>
                <span style={styles.weatherIcon}>{getWeatherIcon(weather.weather[0].main)}</span>
                <h2 style={styles.cityName}>{weather.name}</h2>
              </div>
              <p style={styles.temperature}>{weather.main.temp}°C</p>
              <p style={styles.description}>{weather.weather[0].description}</p>
              <div style={styles.infoBox}>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} km/h</p>
              </div>
            </div>
          )}
          {forecast.length > 0 && (
            <div style={{ ...styles.weatherCard, marginTop: '1rem' }}>
              <h3>5-Day Forecast</h3>
              {forecast.map((item, idx) => (
                <div key={idx} style={{ borderTop: '1px solid #ccc', padding: '0.5rem 0' }}>
                  <p><strong>{new Date(item.dt_txt).toLocaleDateString()}</strong> - {getWeatherIcon(item.weather[0].main)} {item.main.temp}°C - {item.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem 0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
    minHeight: '100vh'
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    color: 'white'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: '3rem',
    marginRight: '0.5rem'
  },
  cardContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    width: '100%',
    maxWidth: '320px'
  },
  searchContainer: {
    display: 'flex',
    gap: '0.5rem',
    width: '100%',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '1rem',
    outline: 'none',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#ff7f50',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  recentContainer: {
    width: '100%',
    textAlign: 'left',
    fontSize: '0.9rem'
  },
  recentList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '0.25rem'
  },
  recentItem: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#add8e6'
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '1.5rem',
    borderRadius: '1.25rem',
    textAlign: 'center',
    width: '100%',
    color: 'white'
  },
  weatherHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  weatherIcon: {
    fontSize: '2rem'
  },
  cityName: {
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  temperature: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  description: {
    textTransform: 'capitalize',
    marginBottom: '1rem'
  },
  infoBox: {
    fontSize: '0.9rem'
  }
};

export default App;
