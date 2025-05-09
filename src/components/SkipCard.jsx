import React from "react";
import "./SkipCard.css";
import { calculateTotalPrice } from "../utils/price";

const SkipCard = ({ skip }) => {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
  const imageSrc = `/images/skips/${skip.size}-yard-skip.jpg`;

  return (
    <article className="skip-card" tabIndex={0} aria-labelledby={`skip-title-${skip.id}`}> 
      <div className="skip-card-image-wrapper">
        <img src={imageSrc} alt={`${skip.size} Yard Skip`} className="skip-card-image" />
        {!skip.allowed_on_road && (
          <div className="skip-card-warning skip-card-warning-road top-right" aria-label="Not allowed on the road">⚠️ Not Allowed On The Road</div>
        )}
        {!skip.allows_heavy_waste && (
          <div className="skip-card-warning skip-card-warning-heavy right-corner" aria-label="Not suitable for heavy waste">⚠️ Not Suitable for Heavy Waste</div>
        )}
      </div>
      <div className="skip-card-content">
        <h3 id={`skip-title-${skip.id}`}>Skip</h3>
        <div className="skip-card-period">{skip.hire_period_days} day hire period</div>
        <div className="skip-card-price">£{totalPrice}</div>
        <button className="skip-card-btn" aria-label={`Select ${skip.size} yard skip`}>
          Select This Skip <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
};

export default SkipCard; 