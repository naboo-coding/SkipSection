import React, { useState, useRef, useEffect } from "react";
import SkipCard from "./SkipCard";
import { useSkips } from "../hooks/useSkips";
import { sortSkips } from "../utils/sortSkips";
import { useDevice } from "../App";
import SkipSummaryBar from "./SkipSummaryBar";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "./SkipList/CustomDropdown";
import FilterSection from "./SkipList/FilterSection";
import { containerVariants, cardVariants, textVariants } from "./SkipList/variants";
import styles from "./SkipList/SkipList.module.css";

const sortOptions = [
  { value: "cheapest", label: "Cheapest First" },
  { value: "expensive", label: "Most Expensive First" },
  { value: "smallest", label: "Smallest First" },
  { value: "largest", label: "Largest First" },
];

const SkipList = () => {
  const { skips, loading, error, sort, setSort } = useSkips();
  // Reference to the grid container to compute dynamic columns
  const gridRef = useRef(null);
  // Number of columns to render in the grid
  const [columns, setColumns] = useState(null);
  const { isMobile } = useDevice();
  const [selectedSkip, setSelectedSkip] = useState(null);
  const sortedSkips = sortSkips(skips, sort);
  // Compute optimal column count to avoid a single item on the last row
  useEffect(() => {
    if (!gridRef.current) return;
    const MIN_CARD_WIDTH = 260; // matches CSS min-width
    const updateColumns = () => {
      const width = gridRef.current.clientWidth;
      let cols = Math.floor(width / MIN_CARD_WIDTH) || 1;
      const total = sortedSkips.length;
      // do not exceed total items
      if (total < cols) cols = total;
      // avoid last row with single item
      if (total % cols === 1 && cols > 1) cols -= 1;
      setColumns(cols);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [sortedSkips.length]);

  if (loading) return <div>Loading skips...</div>;
  if (error) return <div>Error loading skips.</div>;

  const filterSelect = (
    <FilterSection>
      <CustomDropdown
        options={sortOptions}
        value={sort}
        onChange={setSort}
        label="Sort skips"
      />
    </FilterSection>
  );

  return (
    <>
      <motion.section
        className={
          styles.skipListContainer +
          (isMobile ? ' mobile' : ' desktop') +
          (isMobile && selectedSkip ? ' ' + styles.withSummaryBar : '')
        }
        aria-labelledby="skip-list-title"
        aria-live="polite"
        role="region"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={styles.skipListTitle}
          id="skip-list-title"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Choose Your Skip Size
        </motion.h2>
        <motion.p
          className={styles.skipListDesc}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Select the skip size that best suits your needs
        </motion.p>
        {filterSelect}
        <motion.ul
          className={styles.skipListGrid}
          ref={gridRef}
          style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedSkips.map((skip) => (
            <motion.li
              key={skip.id}
              variants={cardVariants}
              style={{ display: 'flex', alignItems: 'flex-start' }}
            >
              <SkipCard skip={skip} onSelect={() => setSelectedSkip(skip)} isMobile={isMobile} />
            </motion.li>
          ))}
        </motion.ul>
        <AnimatePresence>
          {selectedSkip && (
            <SkipSummaryBar
              skip={selectedSkip}
              onBack={() => setSelectedSkip(null)}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default SkipList; 