import { useEffect, useState } from "react";

export function useSkips() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("cheapest");

  useEffect(() => {
    fetch("/data/skips.json")
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { skips, loading, error, sort, setSort };
} 