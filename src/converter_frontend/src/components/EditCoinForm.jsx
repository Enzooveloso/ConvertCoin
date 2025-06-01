import React, { useState } from "react";
import { converter_backend } from "declarations/converter_backend";

const EditCoinForm = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await converter_backend.editValueCoin(code.trim(), name.trim(), parseFloat(value));
      setMessage("Moeda atualizada com sucesso!");
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao editar moeda:", error);
      setMessage("Erro ao editar moeda.");
    }
  };

  return (
    <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-blue-200 w-full max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Editar Moeda</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-800 font-medium mb-1">Código (ex: BTC)</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-medium mb-1">Nome da Moeda</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-medium mb-1">Novo Valor (USD)</label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Atualizar Moeda
        </button>
        {message && <p className="text-center text-blue-700 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default EditCoinForm;