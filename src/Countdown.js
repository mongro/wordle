import React from "react";
import useCountdown from "useContdown";

function Countdown() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const { countdown } = useCountdown(tomorrow);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <span>Next Wordle in </span>
        <span>{`${countdown.hours}:`}</span>
        <span>{`${countdown.minutes}:`}</span>
        <span>{`${countdown.seconds}`}</span>
      </div>
    </div>
  );
}

export default Countdown;
