"use client"
import React, { useEffect, useState } from "react"

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCurrencyData = async () => {
    setLoading(true)
    setError(null)

    try {
      const myHeaders = new Headers()
      myHeaders.append("apikey", "ZYHhbFVZze5YUbwkzJXR12ppcyhbnI4D")

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      }

      // Using USD as source and fetching rates for common currencies
      const response = await fetch(
        "https://api.apilayer.com/currency_data/live?source=USD&currencies=EUR,GBP,JPY,CAD,AUD,CHF,CNY,INR",
        requestOptions,
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error fetching currency data:", error)
      setError("Failed to fetch currency data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrencyData()
  }, [])

   if (loading) {
     return <div className="text-center py-10">Loading currency data...</div>;
   }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <p className="text-sm">
          Last updated: {new Date(data.timestamp * 1000).toLocaleString()}
        </p>
        <button
          onClick={fetchCurrencyData}
          className="px-3 py-1 border rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(data.quotes).map(([currencyPair, rate]) => {
          const currency = currencyPair.replace(data.source, "");

          return (
            <div key={currencyPair} className="border p-4 rounded">
              <div className="font-bold">
                {data.source}/{currency}
              </div>
              <div className="text-2xl my-2">{rate.toFixed(4)}</div>
              <div className="text-xs text-gray-500">
                {getCurrencyFullName(currency)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
