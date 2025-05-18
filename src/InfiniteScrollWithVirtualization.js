import React, { useEffect, useRef, useState } from "react";
const ITEM_HEIGHT = 50;
const VISIBLE_COUNT = 10;
const BUFFER = 5;

function InifiniteScrollWithVirtualization() {
  const [items, setItems] = useState([]);
  const [containerScrollTop, setContainerScrollTop] = useState(0);
  const containerRef = useRef(null);
  const loadMore = () => {
    setTimeout(() => {
      setItems((prev) => {
        let newArray = Array.from(
          { length: VISIBLE_COUNT },
          (_, index) => `This is item number ${prev.length + index + 1}`
        );
        return [...prev, ...newArray];
      });
    }, 1000);
  };
  useEffect(() => {
    loadMore();
  }, []);
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    setContainerScrollTop(scrollTop);
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMore();
    }
  };

  const startIndex = Math.floor(containerScrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(startIndex + VISIBLE_COUNT + BUFFER, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${ITEM_HEIGHT * VISIBLE_COUNT}px`,
        overflowY: "scroll",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: `${items.length * ITEM_HEIGHT}px`,
          position: "relative",
        }}
      >
        {visibleItems.map((singleItem, index) => (
          <div
            style={{
              height: `${ITEM_HEIGHT}px`,
              borderBottom: "1px solid black",
              padding: "0 10px",
              position: "absolute",
              top: `${(startIndex + index) * ITEM_HEIGHT}px`,
              left: 0,
              right: 0,
            }}
            key={`${startIndex + index}-${singleItem}`}
          >
            {singleItem}
          </div>
        ))}
      </div>
      <div style={{ padding: "10px" }}>Loading...</div>
    </div>
  );
}

export default InifiniteScrollWithVirtualization;
