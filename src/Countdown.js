import React from "react";
import useCountdown from "useContdown";

function Countdown() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const { countdown } = useCountdown(tomorrow);
  return (
    <div>
      <div>Next Wordle in </div>
      <span>{`${countdown.hours}:`}</span>
      <span>{`${countdown.minutes}:`}</span>
      <span>{`${countdown.seconds}`}</span>
    </div>
  );
}

export default Countdown;
