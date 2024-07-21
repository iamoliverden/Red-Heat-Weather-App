// components/toggle-switch/toggle-switch.js

import React from "react";
import "./toggle-switch.css";

const ToggleSwitch = ({ unit, onUnitChange }) => {
  const handleToggle = () => {
    onUnitChange(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" checked={unit === "imperial"} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <span>{unit === "metric" ? "°C" : "°F"}</span>
    </div>
  );
};

export default ToggleSwitch;
