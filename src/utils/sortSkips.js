export function sortSkips(skips, sort) {
  return [...skips].sort((a, b) => {
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
} 