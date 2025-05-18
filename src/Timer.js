import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

export const Timer = forwardRef((props, ref) => {
  const [timerState, setTimerState] = useState(0);
  const timeRef = useRef();
  const handleStartTimer = () => {
    if (timeRef.current) return;
    timeRef.current = setInterval(() => {
      setTimerState((prev) => {
        return prev + 1;
      });
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = undefined;
  };
  const resetTimer = () => {
    stopTimer();
    setTimerState(0);
  };

  useImperativeHandle(ref, () => ({
    stopTimer: stopTimer,
    resetTimer: resetTimer,
    startTimer: handleStartTimer,
  }));

  useEffect(() => {
    handleStartTimer();

    () => {
      stopTimer();
    };
  }, []);

  return <div>{timerState}</div>;
});
