import React, { useRef, useEffect, useState } from "react";
import "./Header.css";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { label: "Postcode", icon: "📌" },
  { label: "Waste Type", icon: "🗑️" },
  { label: "Select Skip", icon: "🚛" },
  { label: "Permit Check", icon: "🛡️" },
  { label: "Choose Date", icon: "📅" },
  { label: "Payment", icon: "💳" },
];

const SCROLL_AMOUNT = 120;

const ChevronLeft = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);

const ChevronRight = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
);

const Header = React.memo(({ currentStep = 2, isMobile = false }) => {
  const activeStepRef = useRef(null);
  const stepperRef = useRef(null);
  const [prevStep, setPrevStep] = useState(currentStep);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (isMobile && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep, isMobile]);

  useEffect(() => {
    setPrevStep(currentStep);
  }, [currentStep]);

  // Show/hide scroll arrows on mobile
  useEffect(() => {
    if (!isMobile) return;
    const stepper = stepperRef.current;
    if (!stepper) return;
    const checkScroll = () => {
      setCanScrollLeft(stepper.scrollLeft > 8);
      setCanScrollRight(stepper.scrollLeft + stepper.offsetWidth < stepper.scrollWidth - 8);
    };
    checkScroll();
    stepper.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      stepper.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [isMobile]);

  const scrollStepper = (direction) => {
    const stepper = stepperRef.current;
    if (!stepper) return;
    const amount = direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    stepper.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const stepVariants = {
    inactive: {
      scale: 0.95,
      opacity: 0.7,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  const dividerVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut", 
        delay: 0.3 
      }
    }
  };

  // Define wiggle animation variant separate from spring animations
  const iconWiggleVariants = {
    initial: { rotate: -10, scale: 0.9 },
    active: { rotate: 0, scale: 1 },
    inactive: { rotate: 0, scale: 0.9 }
  };

  // Animation variants for the wiggle effect
  const wiggleAnimation = {
    initial: { scale: 1 },
    animate: { 
      rotate: [0, -3, 3, -2, 0], 
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1]
      }
    },
    exit: { scale: 1 }
  };

  return (
    <motion.header 
      className={`header${isMobile ? " mobile" : ""}`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Left scroll arrow (absolute, sibling to stepper) */}
      {isMobile && (
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              className="stepper-scroll-arrow left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Scroll left"
              onClick={() => scrollStepper('left')}
              tabIndex={0}
              type="button"
              style={{ boxShadow: '0 2px 8px 0 rgba(24,25,26,0.08)' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft /></span>
            </motion.button>
          )}
        </AnimatePresence>
      )}
      <motion.nav 
        className="stepper"
        ref={stepperRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            className={`stepper-step${idx === currentStep ? " active" : ""}`}
            ref={idx === currentStep ? activeStepRef : null}
            variants={stepVariants}
            initial="inactive"
            animate={idx === currentStep ? "active" : "inactive"}
            whileHover={{ scale: idx === currentStep ? 1.05 : 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="stepper-icon"
              initial={{ rotate: 0, scale: idx === currentStep ? 1 : 0.9 }}
              animate={{ rotate: 0, scale: idx === currentStep ? 1 : 0.9 }}
              transition={{ 
                scale: { type: "spring", stiffness: 200 }
              }}
            >
              {step.icon}
              
              <AnimatePresence mode="wait">
                {idx === currentStep && idx !== prevStep && (
                  <motion.div
                    key={`wiggle-${currentStep}`}
                    className="icon-overlay"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={wiggleAnimation}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'inherit'
                    }}
                  >
                    {step.icon}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
            <motion.span 
              className="stepper-label"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: idx === currentStep ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {step.label}
            </motion.span>
            {idx < steps.length - 1 && (
              <motion.span 
                className="stepper-divider"
                variants={dividerVariants}
                initial="initial"
                animate="animate"
                custom={idx}
              />
            )}
          </motion.div>
        ))}
      </motion.nav>
      {/* Right scroll arrow (absolute, sibling to stepper) */}
      {isMobile && (
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              className="stepper-scroll-arrow right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Scroll right"
              onClick={() => scrollStepper('right')}
              tabIndex={0}
              type="button"
              style={{ boxShadow: '0 2px 8px 0 rgba(24,25,26,0.08)' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight /></span>
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </motion.header>
  );
});

export default Header; 