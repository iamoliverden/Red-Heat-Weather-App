// components/forecast/forecast.js

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const Forecast = ({ data, unit }) => {
  const forecastDays = data.list.slice(0, 7).map((item, idx) => {
    const date = new Date();
    date.setDate(date.getDate() + idx + 1); // Add idx days to the current date
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get the day of the week
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `${day}. ${formattedDate}`;
  });

  return (
    <>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          const temperature = unit === "metric" ? Math.round(item.main.temp) : Math.round((item.main.temp * 9/5) + 32);
          const feelsLike = unit === "metric" ? Math.round(item.main.feels_like) : Math.round((item.main.feels_like * 9/5) + 32);

          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">{item.weather[0].description}</label>
                    <label className="min-max">{temperature}°{unit === "metric" ? "C" : "F"}</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{feelsLike}°{unit === "metric" ? "C" : "F"}</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
