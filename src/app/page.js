"use client";

import { getCryptoColor, getCryptoName } from "@/lib/getCurrencyName";
import { useEffect, useState } from "react";

export default function Home() {
  const [cryptoData, setCryptoData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCryptoData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        "https://api.coinlayer.com/live?access_key=7af376d926e901da08710a0ea13fe167&target=USD&symbols=BTC,ETH,XRP,LTC,ADA,DOT,DOGE,SOL,MATIC,AVAX"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      // Save previous data for price change comparison
      if (cryptoData?.rates) {
        setPreviousData(cryptoData.rates);
      }

      setCryptoData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchCryptoData();

    // Then fetch every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const containerClass = "min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 transition-colors duration-300";

  const cardClass = "bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 transition-all hover:shadow-xl hover:transform hover:scale-105 duration-300";

  if (loading) {
    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-6">
          <div className="relative h-24 w-24">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500"></div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
              <svg
                className="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
          <p className="text-lg font-medium">Loading cryptocurrency data...</p>
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <div className="h-2 w-2 rounded-full bg-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClass}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/30 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-red-400 text-lg">Error</p>
                <p className="text-red-300">{error}</p>
                <button
                  onClick={fetchCryptoData}
                  className="mt-3 px-4 py-2 bg-red-800 text-red-300 rounded-md hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cryptoData?.rates || Object.keys(cryptoData.rates).length === 0) {
    return (
      <div className={containerClass}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-yellow-400 text-lg">No Data</p>
                <p className="text-yellow-300">No cryptocurrency data available</p>
                <button
                  onClick={fetchCryptoData}
                  className="mt-3 px-4 py-2 bg-yellow-800 text-yellow-300 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cryptoList = Object.entries(cryptoData.rates)
    .filter(([symbol]) => !["USD", "EUR", "GBP", "JPY", "CNY"].includes(symbol))
    .map(([symbol, price]) => ({
      symbol,
      name: getCryptoName(symbol),
      price,
      color: getCryptoColor(symbol),
    }))
    .sort((a, b) => b.price - a.price);

  return (
    <div className={containerClass}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Cryptocurrency Prices
            </h2>
            <p className="mt-2 text-sm text-gray-400 flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Last updated: {new Date(cryptoData.timestamp * 1000).toLocaleString()}
            </p>
          </div>

          <button
            onClick={fetchCryptoData}
            disabled={refreshing}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {refreshing ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            )}
            <span className="font-medium">
              {refreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cryptoList.map((crypto) => (
            <div
              key={crypto.symbol}
              className={cardClass}
              style={{ borderTopColor: crypto.color }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${crypto.color}20` }}
                    >
                      <span
                        className="font-bold text-sm"
                        style={{ color: crypto.color }}
                      >
                        {crypto.symbol}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {crypto.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {crypto.symbol}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Price</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-white">
                        ${crypto.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


