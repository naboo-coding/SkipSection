import React, { useEffect, useState } from "react";
import SkipCard from "./SkipCard";
import "./SkipList.css";

const sortOptions = [
  { value: "cheapest", label: "Cheapest First" },
  { value: "expensive", label: "Most Expensive First" },
  { value: "smallest", label: "Smallest First" },
  { value: "largest", label: "Largest First" },
];

const SkipList = () => {
  const [skips, setSkips] = useState([]);
  const [sort, setSort] = useState("cheapest");

  useEffect(() => {
    fetch("/data/skips.json")
      .then((res) => res.json())
      .then((data) => setSkips(data))
      .catch((err) => console.error("Error fetching skips:", err));
  }, []);

  const sortedSkips = [...skips].sort((a, b) => {
    switch (sort) {
      case "cheapest":
        return (a.price_before_vat * (1 + a.vat / 100)) - (b.price_before_vat * (1 + b.vat / 100));
      case "expensive":
        return (b.price_before_vat * (1 + b.vat / 100)) - (a.price_before_vat * (1 + a.vat / 100));
      case "smallest":
        return a.size - b.size;
      case "largest":
        return b.size - a.size;
      default:
        return 0;
    }
  });

  return (
    <div className="skip-list-container">
      <h2 className="skip-list-title">Choose Your Skip Size</h2>
      <p className="skip-list-desc">Select the skip size that best suits your needs</p>
      <div className="skip-list-filter-bar">
        <label htmlFor="skip-sort" style={{ color: '#b0b3b8', fontWeight: 600 }}>Sort by:</label>
        <select
          id="skip-sort"
          className="skip-list-filter-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="skip-list-grid">
        {sortedSkips.map((skip) => (
          <SkipCard key={skip.id} skip={skip} />
        ))}
      </div>
    </div>
  );
};

export default SkipList; 