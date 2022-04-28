import React from "react";

function Modal({ open, children, onClose }) {
  return open ? (
    <div className="fixed z-50 inset-0">
      <div className="inset-0 bg-neutral-800 opacity-50 absolute " />
      <div className="dark:bg-black bg-white p-4 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full max-w-lg shadow-xl">
        <button
          className="flex items-center justify-center absolute top-5 right-5"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            ></path>
          </svg>
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
