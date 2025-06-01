import React, { useState, useEffect } from "react";
import CoinList from "./components/CoinList";
import ConvertCoin from "./components/ConvertCoin";
import AddCoinForm from "./components/AddCoinForm";
import EditCoinForm from "./components/EditCoinForm";
import { converter_backend } from "declarations/converter_backend";

export default function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [coins, setCoins] = useState([]);

  const loadCoins = async () => {
    const res = await converter_backend.getCoins();
    setCoins(res);
  };

  useEffect(() => {
    loadCoins();
  }, [showAdd, showEdit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 text-white font-sans p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-[#1B263B]">Conversor de Criptomoedas</h1>
        <img src="/logo2.svg" alt="Miniatura ICP" className="logo-miniatura" />
      </div>
      <section className="bg-white text-gray-900 rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Moedas Cadastradas</h2>
        <CoinList coins={coins} />
      </section>

      <section className="bg-white text-gray-900 rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Conversão</h2>
        <ConvertCoin coins={coins} />
      </section>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            setShowAdd(!showAdd);
            setShowEdit(false);
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        >
          {showAdd ? "Fechar Cadastro" : "Cadastrar Nova Moeda"}
        </button>

        <button
          onClick={() => {
            setShowEdit(!showEdit);
            setShowAdd(false);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          {showEdit ? "Fechar Edição" : "Editar Valor de Moeda"}
        </button>
      </div>

      {showAdd && (
        <div className="mt-6 bg-white text-gray-900 rounded-lg shadow-md p-4">
          <AddCoinForm onFinish={() => setShowAdd(false)} />
        </div>
      )}

      {showEdit && (
        <div className="mt-6 bg-white text-gray-900 rounded-lg shadow-md p-4">
          <EditCoinForm onFinish={() => setShowEdit(false)} />
        </div>
      )}
    </div>
  );
}