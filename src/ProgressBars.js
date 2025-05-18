import { useEffect, useRef, useState } from "react";

function SingleProgressBar({ progress }) {
  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 20,
        border: "1px solid black",
        background: "grey",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: `${progress * 200}px`,
          height: 20,
          background: "green",
        }}
      ></div>
    </div>
  );
}

export default function ProgressBars() {
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { progress: 0, status: "not-started" }]);
  };

  useEffect(() => {
    const inProgressCount = items.filter(
      (i) => i.status === "in-progress"
    ).length;

    if (inProgressCount >= 3) return;

    const toStartIndex = items.findIndex((i) => i.status === "not-started");
    if (toStartIndex === -1) return;

    const intervalId = setInterval(() => {
      setItems((prev) => {
        const updated = [...prev];
        const item = updated[toStartIndex];
        if (!item || item.status !== "in-progress") return prev;

        if (item.progress + 0.1 >= 1) {
          clearInterval(intervalId);
          item.progress = 1;
          item.status = "completed";
        } else {
          item.progress += 0.1;
        }
        return [...updated];
      });
    }, 1000);

    setItems((prev) => {
      const updated = [...prev];
      updated[toStartIndex].status = "in-progress";
      return updated;
    });
  }, [items]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {items.map((item, index) => (
        <SingleProgressBar key={index} progress={item.progress} />
      ))}
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}
