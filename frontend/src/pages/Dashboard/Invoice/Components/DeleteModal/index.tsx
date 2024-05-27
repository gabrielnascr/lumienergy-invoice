import React from "react";

interface DeleteModalProps {
  onDelete: () => void;
}

export default function DeleteModal({ onDelete }: DeleteModalProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Confirmar Exclusão da Fatura
      </h2>
      <p className="text-center">
        Tem certeza de que deseja excluir esta fatura? Esta ação é irreversível
        e todos os dados associados serão permanentemente apagados.
      </p>
      <div className="gap-2 flex mt-10">
        <button
          className="cursor w-20 p-2 rounded-3xl text-greenLumi font-bold border border-greenLumi"
          type="button"
        >
          Não
        </button>
        <button
          className="cursor bg-[#FF5A5F] w-20 p-2 rounded-3xl text-white font-bold"
          type="button"
          onClick={onDelete}
        >
          Sim
        </button>
      </div>
    </div>
  );
}
