import React from "react";

const Header = ({ toggleDarkMode, setShowStatistics }) => {
  return (
    <header className="flex items-center justify-center mb-2 px-2">
      <button onClick={() => toggleDarkMode()} aria-label="darkmode">
        <svg width="24px" height="24px" viewBox="0 0 24 24">
          <g
            id="🔍-Product-Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="ic_fluent_dark_theme_24_regular"
              fill="currentColor"
              fillRule="nonzero"
            >
              <path
                d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"
                id="🎨-Color"
              />
            </g>
          </g>
        </svg>
      </button>
      <div className="text-center text-3xl font-bold grow max-w-lg">Wordle</div>
      <button
        className="flex items-center justify-center"
        onClick={() => setShowStatistics(true)}
        aria-label="showStatistics"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="currentColor"
            d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
          ></path>
        </svg>
      </button>
    </header>
  );
};

export default Header;
