import { useRef, useState } from "react";

// Stopwatch with play pause reset
export default function Stopwatch() {
  const [stopwatch, setStopWatch] = useState({
    hours: "00",
    minutes: "59",
    seconds: "50",
  });
  const stopwatchInterval = useRef();
  const sanitizeDigit = (num) => {
    if (num.toString().length === 1) {
      return `0${num}`;
    } else return num;
  };
  const handlePauseTimer = () => {
    clearInterval(stopwatchInterval.current);
    stopwatchInterval.current = undefined;
  };

  const handleResetTimer = () => {
    clearInterval(stopwatchInterval.current);
    setStopWatch({
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
  };

  const handleStartTimer = () => {
    if (stopwatchInterval.current) return;
    const updateStopwatch = () => {
      setStopWatch((prev) => {
        let seconds = Number(prev.seconds);
        let minutes = Number(prev.minutes);
        let hours = Number(prev.hours);

        let newSeconds = (seconds + 1) % 60;
        let newMinutes = (minutes + Math.floor((seconds + 1) / 60)) % 60;
        let newHours =
          (hours +
            Math.floor((minutes + Math.floor((seconds + 1) / 60)) / 60)) %
          24;

        return {
          hours: sanitizeDigit(newHours),
          minutes: sanitizeDigit(newMinutes),
          seconds: sanitizeDigit(newSeconds),
        };
      });
    };

    stopwatchInterval.current = setInterval(() => {
      updateStopwatch();
    }, 500);
  };

  return (
    <>
      <div className="stopwatch">
        <div>{stopwatch.hours}</div>:<div>{stopwatch.minutes}</div>:
        <div>{stopwatch.seconds}</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleStartTimer}>Start</button>
        <button onClick={handlePauseTimer}>Pause</button>
        <button onClick={handleResetTimer}>Reset</button>
      </div>
    </>
  );
}
