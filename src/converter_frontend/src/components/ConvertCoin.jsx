import React, { useEffect, useState } from "react";
import { converter_backend } from "declarations/converter_backend";

export default function ConvertCoin({ coins }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    if (!from || !to || !amount) return;
    const value = await converter_backend.convertCoin(from, to, parseFloat(amount));
    setResult(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="p-2 rounded bg-gray-100"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          <option value="">De:</option>
          {coins.map((c, i) => (
            <option key={i} value={c.code}>{c.name} ({c.code})</option>
          ))}
        </select>

        <select
          className="p-2 rounded bg-gray-100"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="">Para:</option>
          {coins.map((c, i) => (
            <option key={i} value={c.code}>{c.name} ({c.code})</option>
          ))}
        </select>

        <input
          type="number"
          className="p-2 rounded bg-gray-100"
          placeholder="Quantidade"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Converter
      </button>

      {result !== null && (
        <div className="mt-2 text-lg font-medium">
          Resultado: <span className="text-green-600">{result.toFixed(4)}</span>
        </div>
      )}
    </div>
  );
}
