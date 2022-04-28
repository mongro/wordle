import { useState, useEffect } from "react";

const useLocalStorage = (key, initial) => {
  const [state, setState] = useState(() => {
    const stored = JSON.parse(window.localStorage.getItem(key)) ?? initial;
    return stored;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
