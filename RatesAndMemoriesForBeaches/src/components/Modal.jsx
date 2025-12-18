import React from "react";

const Modal = ({ beach, closeModal }) => {
  if (!beach) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-2xl"
        >
          &times;
        </button>
        <img
          src={beach.image}
          alt={beach.name}
          className="w-full h-48 object-cover rounded mb-3"
        />
        <h2 className="text-2xl font-bold">{beach.name}</h2>
        <p className="text-blue-600">{beach.location}</p>
        <p>₱{beach.rate.toLocaleString()}</p>
        <p>{beach.description}</p>
      </div>
    </div>
  );
};

export default Modal;
