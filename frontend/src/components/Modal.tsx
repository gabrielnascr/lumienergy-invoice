import React from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../store";
import { closeModal } from "../store/modules/modal/modalSlice";

const ModalContainer = () => {
  const { isModalOpen, modalContainer } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg">
        <button
          onClick={() => store.dispatch(closeModal())}
          className="absolute top-0 right-0 m-2 p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {modalContainer}
      </div>
    </div>
  );
};

export default ModalContainer;
