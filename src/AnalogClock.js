import { useEffect, useState } from "react";
import "./analogClock.css";
// 12 hours = 360 degree - 30 degree
// 60 minutes = 360 degree - 6 degree
// 60 seconds = 360 degree - 6 degree

export default function AnalogClock() {
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  useEffect(() => {
    const intervalId = setInterval(() => {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();

      setTime({ hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div className="analog-clock">
        <div
          className="hour-hand hand"
          style={{ transform: `rotate(${time.hours * 30 + 180}deg)` }}
        ></div>
        <div
          className="minute-hand hand"
          style={{ transform: `rotate(${time.minutes * 6 + 180}deg)` }}
        ></div>
        <div
          className="second-hand hand"
          style={{ transform: `rotate(${time.seconds * 6 + 180}deg)` }}
        ></div>
        <div className="hours">
          {hours.map((hour) => {
            const angle = hour * 30;
            const radius = 230;

            return (
              <div
                key={hour}
                className="hour-number"
                style={{
                  transform: `
          rotate(${angle}deg)
          translateY(-${radius}px)
          rotate(-${angle}deg)
        `,
                }}
              >
                {hour}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {time.hours}:{time.minutes}:{time.seconds}
      </div>
    </>
  );
}
