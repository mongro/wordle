import { useState, useEffect, useRef } from "react";

const SEC_PER_DAY = 60 * 60 * 24;
const SEC_PER_HOUR = 60 * 60;
const SEC_PER_MIN = 60;

const HOURS_PER_DAY = 24;
const MIN_PER_HOUR = 60;

export const formatMsLeft = (
  msLeft,
  unit = "days",
  compact,
  displayMS = false
) => {
  const diffDays = Math.floor(msLeft / (SEC_PER_DAY * 1000));
  const diffHours = Math.floor(msLeft / (SEC_PER_HOUR * 1000));
  const diffMin = Math.floor(msLeft / (SEC_PER_MIN * 1000));
  const diffSec = Math.floor(msLeft / 1000);

  switch (unit) {
    case "days":
      return {
        days: compact && diffDays === 0 ? undefined : diffDays,
        hours:
          compact && diffHours === 0 && diffDays === 0
            ? undefined
            : diffHours % HOURS_PER_DAY,
        minutes: diffMin % MIN_PER_HOUR,
        seconds: diffSec % SEC_PER_MIN,
        miliseconds: displayMS ? msLeft % 1000 : undefined,
      };
    case "hours":
      return {
        hours: compact && diffHours === 0 ? undefined : diffHours,
        minutes: diffMin % MIN_PER_HOUR,
        seconds: diffSec % SEC_PER_MIN,
        miliseconds: displayMS ? msLeft % 1000 : undefined,
      };
    case "minutes":
      return {
        minutes: diffMin,
        seconds: diffSec % SEC_PER_MIN,
        miliseconds: displayMS ? msLeft % 1000 : undefined,
      };
    case "seconds":
      return {
        seconds: diffSec,
        miliseconds: displayMS ? msLeft % 1000 : undefined,
      };
    default:
      return {
        seconds: diffSec,
        miliseconds: displayMS ? msLeft % 1000 : undefined,
      };
  }
};

export const getStringValues = (countdown) => {
  return {
    days: toString(countdown.days),
    hours: toString(countdown.hours),
    minutes: toString(countdown.minutes),
    seconds: toString(countdown.seconds),
    miliseconds: msToString(countdown.miliseconds),
  };
};

export const toString = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const msToString = (value) => {
  return value < 100 ? `0${value}` : value < 10 ? `00${value}` : value;
};

const useCountdown = (
  initialDate,
  initFormat = { toStrings: true, compact: false, unit: "days" },
  allowCountUp = false
) => {
  const [date, setDate] = useState(new Date(initialDate));
  const [format, setFormat] = useState(initFormat);
  const [msLeft, setMsLeft] = useState(null);
  const timer = useRef(null);

  const { toStrings = true, compact = false, unit = "days" } = format;

  useEffect(() => {
    timer.current = setInterval(updateMsLeft, 1000);
    return () => clearInterval(timer.current);
  }, [date]);

  useEffect(() => {
    if (msLeft !== null && msLeft < 1 && !allowCountUp) {
      clearInterval(timer.current);
    }
  }, [msLeft, allowCountUp]);

  const changeDate = (date) => {
    const newDate = new Date(date);
    setDate(newDate);
  };

  const changeFormat = (params) => {
    setFormat({ ...format, ...params });
  };

  const updateMsLeft = () => {
    const now = Date.now();
    let diffSec = date.getTime() - now;
    diffSec *= diffSec < 0 ? -1 : 1;
    setMsLeft(diffSec);
  };

  let countdown = formatMsLeft(msLeft, unit, compact);
  countdown = toStrings ? getStringValues(countdown) : countdown;

  return { changeDate, countdown, changeFormat, format };
};

export default useCountdown;
