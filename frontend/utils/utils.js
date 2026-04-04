export function formatPrice(price, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
}

export function calculateIva(value) {
  const totalValue = value * 1.21;
  const taxe = totalValue - value;

  const cleanTotalValue = Number(totalValue.toFixed(2));
  const cleanTaxe = Number(taxe.toFixed(2));

  return {
    total: cleanTotalValue,
    taxe: cleanTaxe,
  };
}
