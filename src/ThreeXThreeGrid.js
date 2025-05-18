import { useEffect, useRef, useState } from "react";
import "./flipcard.css";
const N = 3;
const getRandomColorHex = () => {
  let color =
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  return color;
};
const generateNRandomColorsHex = (n) => {
  let array = new Array(n);

  for (let i = 0; i < n; i++) {
    array[i] = getRandomColorHex();
  }
  return array;
};

export default function ThreeXThreeGrid() {
  const colorsArray = generateNRandomColorsHex(N * N);

  const itemsRef = useRef([]);

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [flipedItems, setFlipedItems] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
  ]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${N},auto)`,
        gridTemplateRows: `repeat(${N},auto)`,
        gridGap: "10px",
        width: 200,
      }}
    >
      {items.map((item, i) => (
        <div
          className="flipCardInner"
          style={{
            width: 50,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            backgroundColor: colorsArray[i],
            cursor: "pointer",
          }}
          onClick={() => {
            if (itemsRef.current[i]) {
              let domEl = itemsRef.current[i];
              //   domEl.style.backgroundColor = getRandomColorHex();
              domEl.classList.toggle("flipped");
            }
          }}
          key={i}
          ref={(el) => {
            if (el) {
              itemsRef.current[i] = el;
            }
          }}
        >
          <div className="flipCardFront"> {item.toString()}</div>
          <div className="flipCardBack"> {flipedItems[i]}</div>
        </div>
      ))}
    </div>
  );
}
