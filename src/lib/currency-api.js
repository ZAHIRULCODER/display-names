export async function getCurrencyData() {
  try {
    const res = await fetch(
      "https://api.apilayer.com/currency_data/live?source=USD&currencies=EUR,GBP,JPY,CAD,AUD,CHF,CNY,INR",
      {
        headers: {
          apikey: "ZYHhbFVZze5YUbwkzJXR12ppcyhbnI4D",
        },
        cache: "no-store", // SSR: avoid caching
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    console.error("Error fetching currency data:", err);
    return {
      error: "Failed to fetch currency data. Please try again later.",
      data: null,
    };
  }
}
