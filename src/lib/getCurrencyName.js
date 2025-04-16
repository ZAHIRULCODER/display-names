// Helper function to get cryptocurrency names
export function getCryptoName(symbol) {
  const cryptoNames = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    XRP: "Ripple",
    LTC: "Litecoin",
    ADA: "Cardano",
    DOT: "Polkadot",
    DOGE: "Dogecoin",
    SOL: "Solana",
    MATIC: "Polygon",
    AVAX: "Avalanche",
  };
  return cryptoNames[symbol] || symbol;
}

// Helper function to get a consistent color for each cryptocurrency
export function getCryptoColor(symbol) {
  const colors = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    XRP: "#23292F",
    LTC: "#BFBBBB",
    ADA: "#0033AD",
    DOT: "#E6007A",
    DOGE: "#C2A633",
    SOL: "#00FFA3",
    MATIC: "#8247E5",
    AVAX: "#E84142",
  };
  return colors[symbol] || "#6E56CF";
}
