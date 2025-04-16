export function getCurrencyFullName(code) {
  const names = {
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
  };

  return names[code] || code;
}
