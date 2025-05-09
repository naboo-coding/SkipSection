import React, { useRef, useEffect } from "react";
import "./Header.css";

const steps = [
  { label: "Postcode", icon: "📌" },
  { label: "Waste Type", icon: "🗑️" },
  { label: "Select Skip", icon: "🚛" },
  { label: "Permit Check", icon: "🛡️" },
  { label: "Choose Date", icon: "📅" },
  { label: "Payment", icon: "💳" },
];

const Header = React.memo(({ currentStep = 2, isMobile = false }) => {
  const activeStepRef = useRef(null);

  useEffect(() => {
    if (isMobile && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep, isMobile]);

  return (
    <header className={`header${isMobile ? " mobile" : ""}`}>
      <nav className="stepper">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className={`stepper-step${idx === currentStep ? " active" : ""}`}
            ref={idx === currentStep ? activeStepRef : null}
          >
            <span className="stepper-icon">{step.icon}</span>
            <span className="stepper-label">{step.label}</span>
            {idx < steps.length - 1 && <span className="stepper-divider" />}
          </div>
        ))}
      </nav>
    </header>
  );
});

export default Header; 