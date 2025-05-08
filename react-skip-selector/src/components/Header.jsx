import React from "react";
import "./Header.css";

const steps = [
  { label: "Postcode", icon: "📍" },
  { label: "Waste Type", icon: "🗑️" },
  { label: "Select Skip", icon: "📦" },
  { label: "Permit Check", icon: "📝" },
  { label: "Choose Date", icon: "📅" },
  { label: "Payment", icon: "💳" },
];

const Header = ({ currentStep = 2 }) => (
  <header className="header">
    <nav className="stepper">
      {steps.map((step, idx) => (
        <div
          key={step.label}
          className={`stepper-step${idx === currentStep ? " active" : ""}`}
        >
          <span className="stepper-icon">{step.icon}</span>
          <span className="stepper-label">{step.label}</span>
          {idx < steps.length - 1 && <span className="stepper-divider" />}
        </div>
      ))}
    </nav>
  </header>
);

export default Header; 