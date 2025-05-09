import React from "react";
import SkipCard from "./SkipCard";
import "./SkipList.css";
import { useSkips } from "../hooks/useSkips";
import { sortSkips } from "../utils/sortSkips";
import { useDevice } from "../App";

const sortOptions = [
  { value: "cheapest", label: "Cheapest First" },
  { value: "expensive", label: "Most Expensive First" },
  { value: "smallest", label: "Smallest First" },
  { value: "largest", label: "Largest First" },
];

const SkipList = () => {
  const { skips, loading, error, sort, setSort } = useSkips();
  const { isMobile } = useDevice();

  if (loading) return <div>Loading skips...</div>;
  if (error) return <div>Error loading skips.</div>;

  const sortedSkips = sortSkips(skips, sort);

  const filterSelect = (
    <select
      id="skip-sort"
      className="skip-list-filter-select"
      value={sort}
      onChange={e => setSort(e.target.value)}
      aria-label="Sort skips"
      style={{ margin: isMobile ? '12px 0' : undefined }}
    >
      {sortOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );

  return isMobile ? (
    <section className="skip-list-container mobile" aria-labelledby="skip-list-title" aria-live="polite" role="region">
      <h2 className="skip-list-title" id="skip-list-title">Choose Your Skip Size</h2>
      <p className="skip-list-desc">Select the skip size that best suits your needs</p>
      {filterSelect}
      <ul className="skip-list-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sortedSkips.map((skip) => (
          <li key={skip.id}>
            <SkipCard skip={skip} />
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section className="skip-list-container desktop" aria-labelledby="skip-list-title" aria-live="polite" role="region">
      <h2 className="skip-list-title" id="skip-list-title">Choose Your Skip Size</h2>
      <p className="skip-list-desc">Select the skip size that best suits your needs</p>
      {filterSelect}
      <ul className="skip-list-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sortedSkips.map((skip) => (
          <li key={skip.id}>
            <SkipCard skip={skip} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkipList; 