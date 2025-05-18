import { useState, useRef } from "react";
import { Timer } from "./Timer";

export function MultipleTimers() {
  const [timers, setTimers] = useState([]);
  const timersRef = useRef([]);
  const addTimer = () => {
    const newTimer = { id: timers.length + 1 };
    setTimers((prev) => {
      return [...prev, newTimer];
    });
  };
  const stopTimers = () => {
    timersRef.current.forEach((timer) => {
      if (timer?.stopTimer) timer.stopTimer();
    });
  };
  const resetTimers = () => {
    timersRef.current.forEach((timer) => {
      if (timer?.resetTimer) timer.resetTimer();
    });
  };
  const startTimers = () => {
    timersRef.current.forEach((timer) => {
      if (timer?.startTimer) timer.startTimer();
    });
  };

  return (
    <div>
      {timers.map((single, index) => (
        <Timer
          key={single.id}
          ref={(el) => {
            timersRef.current[index] = el;
          }}
        />
      ))}
      <button onClick={addTimer}>Add Timer</button>
      <button onClick={stopTimers}>Stop Timers</button>
      <button onClick={resetTimers}>Reset Timers</button>
      <button onClick={startTimers}>Start Timers</button>
    </div>
  );
}
