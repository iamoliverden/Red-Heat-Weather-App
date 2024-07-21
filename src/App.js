// App.js

import { useState } from "react";
import Search from "./components/search/search-field";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import ToggleSwitch from "./components/toggle-switch/toggle-switch";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api-keys";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric"); // Add state for temperature unit

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className="container">
      <div className="search-field">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      <ToggleSwitch unit={unit} onUnitChange={handleUnitChange} />
      {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
      {forecast && <Forecast data={forecast} unit={unit} />}
    </div>
  );
}

export default App;
