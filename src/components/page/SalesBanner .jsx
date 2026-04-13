import React, { useState, useEffect } from "react";
import "./Css/SalesBanner.css";

const SalesBanner = () => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className="sales-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1 className="banner-heading">FLASH SALE 50% OFF</h1>
          <div className="banner-timer">
            <span className="hours">{hours}</span> Hours{" "}
            <span className="minutes">{minutes}</span> Mins
          </div>
          <button className="explore-button">Explore now</button>
        </div>
      </div>
    </div>
  );
};

export default SalesBanner;
