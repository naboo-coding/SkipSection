import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CustomDropdown.module.css";

const dropdownVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeOut" } }
};
const arrowVariants = { closed: { rotate: 0 }, open: { rotate: 180 } };

const CustomDropdown = ({ options, value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeout = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 100);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") setOpen((prev) => !prev);
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <motion.div
      className={styles.dropdown}
      ref={dropdownRef}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={label}
      aria-haspopup="listbox"
      aria-expanded={open}
      role="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <motion.div className={styles.selected} whileHover={{ boxShadow: "0px 0px 0px 2px rgba(37,99,235,0.15), 0px 0px 12px 4px rgba(37,99,235,0.1)" }} whileTap={{ scale: 0.98 }}>
        {options.find(opt => opt.value === value)?.label || label}
        <motion.span style={{ marginLeft: 8, fontSize: '0.9em', display: 'inline-block' }} variants={arrowVariants} animate={open ? "open" : "closed"} transition={{ duration: 0.3 }}>▼</motion.span>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.ul className={styles.list} initial="closed" animate="open" exit="closed" variants={dropdownVariants} style={{ zIndex: 1000 }} role="listbox">
            {options.map(opt => (
              <motion.li
                key={opt.value}
                className={`${styles.option}${value === opt.value ? ' ' + styles.selectedOption : ''}`}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                whileHover={{ backgroundColor: value === opt.value ? "#1741a6" : "#2563eb" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                role="option"
                aria-selected={value === opt.value}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { onChange(opt.value); setOpen(false); } }}
              >
                {opt.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomDropdown; 