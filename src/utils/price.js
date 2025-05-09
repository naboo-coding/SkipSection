export function calculateTotalPrice(priceBeforeVat, vat) {
  return (priceBeforeVat * (1 + vat / 100)).toFixed(0);
} 