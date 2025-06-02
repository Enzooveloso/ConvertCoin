import React, { useState } from "react";
import { converter_backend } from "declarations/converter_backend";

const DeleteCoinForm = ({ onFinish }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const handleDelete = async () => {
    if (!code) {
      setStatus("Informe o código da moeda.");
      return;
    }

    try {
      await converter_backend.deleteCoin(code.toUpperCase());
      setStatus("Moeda deletada com sucesso!");
      setCode("");
      onFinish();
    } catch (error) {
      console.error(error);
      setStatus("Erro ao deletar moeda.");
    }
  };

  return (
    <div className="bg-[#edf1f5] p-6 rounded-2xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold text-[#1f2d3d] mb-4">Excluir Moeda</h2>
      <input
        type="text"
        placeholder="Código (ex: ICP)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-xl font-semibold transition-colors"
      >
        Excluir Moeda
      </button>
      {status && <p className="mt-3 text-sm text-[#1f2d3d]">{status}</p>}
    </div>
  );
};

export default DeleteCoinForm;
