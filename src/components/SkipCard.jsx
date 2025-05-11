import React from "react";
import "./SkipCard.css";
import { calculateTotalPrice } from "../utils/price";
import { motion } from "framer-motion";

const SkipCard = ({ skip, onSelect, isMobile }) => {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
  let imageSrc = "";
  if (skip.size === 4) {
    imageSrc = "/data/wewantwaste4yards.png";
  } else if (skip.size >= 6 && skip.size <= 12) {
    imageSrc = "/data/wewantwaste6to12yards.png";
  } else if (skip.size === 14) {
    imageSrc = "/data/wewantwaste14yards.png";
  } else if (skip.size === 16) {
    imageSrc = "/data/wewantwaste16yards.png";
  } else if (skip.size === 20) {
    imageSrc = "/data/wewantwaste20yards.png";
  } else if (skip.size === 40) {
    imageSrc = "/data/wewantwaste40yards.png";
  }

  const cardVariants = isMobile
    ? {
        initial: { y: 0, scale: 1, transition: { duration: 0 } },
        hover: { y: -2, scale: 1, boxShadow: "0px 2px 8px 0px rgba(37,99,235,0.10)", transition: { type: "spring", stiffness: 400, damping: 20 } }
      }
    : {
        initial: { y: 0, scale: 1, transition: { duration: 0 } },
        hover: { y: -6, scale: 1.02, boxShadow: "0px 0px 0px 2px rgba(37,99,235,0.1), 0px 0px 12px 4px rgba(37,99,235,0.18), 0px 0px 32px 8px rgba(37,99,235,0.12), 0px 6px 32px rgba(37,99,235,0.10)", transition: { type: "spring", stiffness: 400, damping: 20 } }
      };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const warningVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3, 
        duration: 0.4 
      }
    }
  };

  return (
    <motion.article 
      className="skip-card" 
      tabIndex={0} 
      aria-labelledby={`skip-title-${skip.id}`}
      whileHover="hover"
      variants={cardVariants}
      initial="initial"
      style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}
    > 
      <div className="skip-card-image-wrapper">
        <motion.img 
          src={imageSrc} 
          alt={``} 
          className="skip-card-image"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        {skip.size === 20 && (
          <div className="wewantwasteBig"></div>
        )}
        {!skip.allowed_on_road && (
          <motion.div 
            className="skip-card-warning skip-card-warning-road top-right" 
            aria-label="Not allowed on the road"
            variants={warningVariants}
            initial="initial"
            animate="animate"
          >⚠️ Not Allowed On The Road</motion.div>
        )}
        {!skip.allows_heavy_waste && (
          <motion.div 
            className="skip-card-warning skip-card-warning-heavy right-corner" 
            aria-label="Not suitable for heavy waste"
            variants={warningVariants}
            initial="initial"
            animate="animate"
          >⚠️ Not Suitable for Heavy Waste</motion.div>
        )}
      </div>
      <div className="skip-card-content">
        <motion.h3 
          id={`skip-title-${skip.id}`}
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        >{skip.size} Yard Skip</motion.h3>
        <motion.div 
          className="skip-card-period"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >{skip.hire_period_days} day hire period</motion.div>
        <motion.div 
          className="skip-card-price"
          initial={{ opacity: 0.95 }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          transition={{ type: "spring", stiffness: 700, damping: 20 }}
        >£{totalPrice}</motion.div>
        <motion.button 
          className="skip-card-btn" 
          aria-label={`Select ${skip.size} yard skip`} 
          onClick={onSelect}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Select This Skip <motion.span 
            className="arrow" 
            aria-hidden="true"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >→</motion.span>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default SkipCard; 