import React, { memo } from "react";

const Cell = memo(({ index, columns }) => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return (
    <div style={cellStyle}>
      {row},{col}
    </div>
  );
});

const cellStyle = {
  aspectRatio: 1,
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
};

const DynamicGrid = ({ rows, columns }) => {
  const totalCells = rows * columns;

  const cells = Array.from({ length: totalCells }, (_, index) => (
    <Cell key={index} index={index} columns={columns} />
  ));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "4px",
        padding: "8px",
      }}
    >
      {cells}
    </div>
  );
};

export default DynamicGrid;
