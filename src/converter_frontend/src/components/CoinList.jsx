import React from "react";

export default function CoinList({ coins }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2">Sigla</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Valor Atual (USD)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, idx) => (
            <tr key={idx} className="border-b hover:bg-indigo-100">
              <td className="px-4 py-2 font-semibold text-indigo-800">{coin.code}</td>
              <td className="px-4 py-2">{coin.name}</td>
              <td className="px-4 py-2">
                {coin.prices.length > 0
                  ? "$" + coin.prices[coin.prices.length - 1].valueUSD.toFixed(2)
                  : "Sem valor"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
