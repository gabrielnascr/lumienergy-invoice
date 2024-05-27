import React, { ChangeEvent, useState } from "react";
import api from "../../../../../services";
import toast from "react-hot-toast";
import { closeModal } from "../../../../../store/modules/modal/modalSlice";
import { store } from "../../../../../store";

export default function FileUploadModal() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Por favor, selecione pelo menos um arquivo para enviar.");
      return;
    }

    setUploading(true);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("invoices", file);
    });

    try {
      const response = await api.post("/invoices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast(`Número do processamento: ${response.data.batchId}`);
      toast("Quando for finalizado o processamento você verá na dashboard");
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar os arquivos.");
    } finally {
      setUploading(false);
      setSelectedFiles([]);
      store.dispatch(closeModal());
    }
  };

  return (
    <div
      className="items-center flex justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Upload de Arquivos
        </h2>
        <label
          htmlFor="uploadFile1"
          className="mb-5 bg-white w-full text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-2 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          <p className="text-center">
            Arraste e solte arquivos aqui ou clique para enviar
          </p>
          <input
            type="file"
            id="uploadFile1"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs font-medium text-gray-400 mt-2">
            Apenas arquivos PDF são permitidos
          </p>
        </label>
        {selectedFiles.length > 0 && (
          <ul className="mb-4">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="text-red-500 ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6a1 1 0 011-1h6a1 1 0 011 1v9a1 1 0 01-1 1H7a1 1 0 01-1-1V6zm2 9a1 1 0 100-2h2a1 1 0 100 2H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
        >
          Iniciar processamento
        </button>
      </div>
    </div>
  );
}
