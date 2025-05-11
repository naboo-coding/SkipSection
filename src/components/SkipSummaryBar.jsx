import React from "react";
import "./SkipSummaryBar.css";
import { calculateTotalPrice } from "../utils/price";
import { motion, AnimatePresence } from "framer-motion";

const SkipSummaryBar = ({ skip, onBack }) => {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
  
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
      scale: 0.97, 
      transition: { 
        duration: 0.1 
      } 
    }
  };
  
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (index) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: 0.1 + (index * 0.1) 
      }
    })
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: { 
        type: "spring",
        stiffness: 400, 
        damping: 10,
        repeat: Infinity,
        repeatType: "reverse", 
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.div
      className="skip-summary-bar"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 35,
        bounce: 0.1
      }}
    >
      <motion.div 
        className="skip-summary-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span 
          className="skip-summary-size"
          variants={contentVariants}
          custom={0}
          initial="initial"
          animate="animate"
        >
          {skip.size} Yard Skip
        </motion.span>
        <motion.span 
          className="skip-summary-price"
          variants={contentVariants}
          custom={1}
          initial="initial"
          animate="animate"
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 700, damping: 30 }
          }}
        >
          £{totalPrice}
        </motion.span>
        <motion.span 
          className="skip-summary-period"
          variants={contentVariants}
          custom={2}
          initial="initial"
          animate="animate"
        >
          {skip.hire_period_days} day hire
        </motion.span>
      </motion.div>
      
      <motion.span 
        className="skip-summary-divider"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      />
      
      <motion.div 
        className="skip-summary-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button 
          className="skip-summary-back" 
          onClick={onBack}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          Back
        </motion.button>
        <motion.button 
          className="skip-summary-continue"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          Continue 
          <motion.span 
            className="arrow"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SkipSummaryBar; 