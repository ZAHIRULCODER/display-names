import { getCurrencyData } from "@/lib/currency-api";
import { getCurrencyFullName } from "@/lib/getCurrencyFullName";

export default async function Home() {
  const { data, error } = await getCurrencyData();
  console.log(data)

  if (error) {
    return (
      <div className="border p-4 rounded">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="border p-4 rounded">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
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
