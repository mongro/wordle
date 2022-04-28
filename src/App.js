import Header from "./Header";
import Wordle from "./Wordle";
import React, { useEffect, useState } from "react";
import useLocalStorage from "localStorage";

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.add(
      "dark:bg-black",
      "dark:text-white",
      "text-black",
      "bg-white"
    );
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Header
        toggleDarkMode={toggleDarkMode}
        setShowStatistics={setShowStatistics}
      />
      <Wordle
        showStatistics={showStatistics}
        setShowStatistics={setShowStatistics}
      />
    </>
  );
}

export default App;
