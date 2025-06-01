import React, { useState } from "react";
import { converter_backend } from "declarations/converter_backend";

const AddCoinForm = ({ onCoinAdded }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const handleAddCoin = async () => {
    if (!code || !name || !value) {
      setStatus("Preencha todos os campos.");
      return;
    }

    try {
      await crypto_converter_backend.addCoin(code.toUpperCase(), name, parseFloat(value));
      setStatus("Moeda adicionada com sucesso!");
      onCoinAdded();
      setCode("");
      setName("");
      setValue("");
    } catch (error) {
      console.error(error);
      setStatus("Erro ao adicionar moeda.");
    }
  };

  return (
    <div className="bg-[#edf1f5] p-6 rounded-2xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold text-[#1f2d3d] mb-4">Adicionar Moeda</h2>
      <input
        type="text"
        placeholder="Código (ex: BTC)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a7bb7]"
      />
      <input
        type="text"
        placeholder="Nome da moeda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a7bb7]"
      />
      <input
        type="number"
        placeholder="Valor em USD"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a7bb7]"
      />
      <button
        onClick={handleAddCoin}
        className="bg-[#4a7bb7] text-white w-full py-3 rounded-xl font-semibold hover:bg-[#3d669a] transition-colors"
      >
        Adicionar
      </button>
      {status && <p className="mt-3 text-sm text-[#1f2d3d]">{status}</p>}
    </div>
  );
};

export default AddCoinForm;