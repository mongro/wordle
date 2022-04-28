import React, { useEffect, useRef } from "react";

function Alert({ show, showDuration, onClose, children }) {
  const closeTimer = useRef(-1);

  const closeAlert = () => {
    if (onClose) onClose();
  };

  const setCloseTimer = (showDuration) => {
    if (!onClose) return;
    closeTimer.current = window.setTimeout(closeAlert, showDuration);
  };

  useEffect(() => {
    if (show) {
      setCloseTimer(showDuration);
    }

    return () => {
      clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div className="p-2 dark:bg-white bg-black dark:text-black text-white rounded mb-2">
      {children}
    </div>
  );
}

export default Alert;
