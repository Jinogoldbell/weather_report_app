import { useState } from "react";
import axios from "axios";
import "./Weather.css";

// Get a free API key at https://openweathermap.org/api and put it in a
// .env file at the project root as REACT_APP_WEATHER_API_KEY=yourKeyHere
const API_KEY = "e7df2ed28b3760a2ba55495549114bae";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async (cityName) => {
    // API URL is built dynamically with the user's input via a template literal
    const url = `${BASE_URL}?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric`;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response && err.response.status === 404) {
        setError(`We couldn't find "${cityName}". Check the spelling and try again.`);
      } else if (err.response && err.response.status === 401) {
        setError("The weather API key is missing or invalid.");
      } else if (err.request) {
        setError("No response from the weather service. Check your connection.");
      } else {
        setError("Something went wrong while fetching the weather.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Enter a city name to search.");
      setWeather(null);
      return;
    }

    if (!API_KEY) {
      setError(
        "No API key found. Add REACT_APP_WEATHER_API_KEY to a .env file, then restart the app."
      );
      return;
    }

    fetchWeather(trimmedCity);
  };

  return (
    <section className="weather-card" aria-label="Weather search">
      <form className="search-row" onSubmit={handleSubmit}>
        <label htmlFor="city-input" className="visually-hidden">
          City name
        </label>
        <input
          id="city-input"
          type="text"
          placeholder="Search a city, e.g. Gisborne"
          value={city}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {weather && !error && (
        <article className="weather-result">
          <header className="result-header">
            <div>
              <h2>
                {weather.name}, {weather.sys?.country}
              </h2>
              <p className="condition">{weather.weather?.[0]?.description}</p>
            </div>
            {weather.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width="72"
                height="72"
              />
            )}
          </header>

          <p className="temp-now">{Math.round(weather.main.temp)}°C</p>

          <dl className="stats-grid">
            <div className="stat">
              <dt>Feels like</dt>
              <dd>{Math.round(weather.main.feels_like)}°C</dd>
            </div>
            <div className="stat">
              <dt>Humidity</dt>
              <dd>{weather.main.humidity}%</dd>
            </div>
            <div className="stat">
              <dt>Wind</dt>
              <dd>{weather.wind.speed} m/s</dd>
            </div>
            <div className="stat">
              <dt>Pressure</dt>
              <dd>{weather.main.pressure} hPa</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}

export default Weather;
