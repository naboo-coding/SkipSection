import React from "react";
import "./SkipCard.css";

const SkipCard = ({ skip }) => {
  const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(0);
  const imageSrc = `/images/skips/${skip.size}-yard-skip.jpg`;

  return (
    <div className="skip-card">
      <div className="skip-card-image-wrapper">
        <img src={imageSrc} alt={`${skip.size} Yard Skip`} className="skip-card-image" />
        <span className="skip-card-size-badge">{skip.size} Yards</span>
        {!skip.allowed_on_road && (
          <div className="skip-card-warning skip-card-warning-road">⚠️ Not Allowed On The Road</div>
        )}
        {!skip.allows_heavy_waste && (
          <div className="skip-card-warning skip-card-warning-heavy">⚠️ Not Suitable for Heavy Waste</div>
        )}
      </div>
      <div className="skip-card-content">
        <h3>{skip.size} Yard Skip</h3>
        <div className="skip-card-period">{skip.hire_period_days} day hire period</div>
        <div className="skip-card-price">£{totalPrice}</div>
        <a href={`#select-${skip.id}`} className="skip-card-btn">
          Select This Skip <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default SkipCard; 