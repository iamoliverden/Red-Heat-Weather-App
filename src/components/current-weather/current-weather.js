// components/current-weather/current-weather.js

import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, unit }) => {
  const temperature = unit === "metric" ? Math.round(data.main.temp) : Math.round((data.main.temp * 9/5) + 32);
  const feelsLike = unit === "metric" ? Math.round(data.main.feels_like) : Math.round((data.main.feels_like * 9/5) + 32);

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="date"><strong>Today, {currentDate}</strong></p>
          <p className="city">{data.city} </p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{temperature}°{unit === "metric" ? "C" : "F"}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {feelsLike}°{unit === "metric" ? "C" : "F"}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
