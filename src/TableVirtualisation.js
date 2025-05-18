import { useEffect, useState, useRef } from "react";
const ITEM_HEIGHT = 50;
const VISIBLE_COUNT = 10;
export default function TableVirtualisation() {
  const [data, setData] = useState([]);
  const [containerScrollTop, setContainerScrollTop] = useState(0);
  const containerRef = useRef();
  const makeNetworkCall = (limit = VISIBLE_COUNT, skip = 0) => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) =>
        setData((prev) => {
          return [...prev, ...res.products];
        })
      );
  };
  useEffect(() => {
    makeNetworkCall();
  }, []);
  console.log("data", data);

  const columns = [
    { name: "ID", dataKey: "id", width: 20 },
    { name: "Title", dataKey: "title", width: 200 },
    { name: "Brand", dataKey: "brand", width: 100 },
    { name: "Category", dataKey: "category", width: 100 },
  ];

  const handleScroll = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    setContainerScrollTop(scrollTop);
    console.log({ clientHeight, scrollHeight, scrollTop });

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      makeNetworkCall(10, data.length);
    }
  };

  const startIndex = Math.floor(containerScrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(startIndex + VISIBLE_COUNT + 5, data.length);
  const itemsToDisplay = data.slice(startIndex, endIndex);

  return (
    <div>
      <table
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.name}
                style={{
                  border: "1px solid #ddd",
                  textAlign: "left",
                  paddingLeft: 8,
                  height: ITEM_HEIGHT,
                  background: "#fff",
                  width: column.width,
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div
        ref={containerRef}
        style={{
          height: `${ITEM_HEIGHT * VISIBLE_COUNT}px`,
          overflowY: "auto",
          width: "100%",
        }}
        onScroll={handleScroll} // Optional: to control virtualization
      >
        <div
          style={{
            height: `${ITEM_HEIGHT * data.length}px`,
            position: "relative",
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              {itemsToDisplay.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    width: "100%",
                    height: ITEM_HEIGHT,
                    position: "absolute",
                    top: `${ITEM_HEIGHT * (index + startIndex)}px`,
                    left: 0,
                    right: 0,
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.name}`}
                      style={{
                        border: "1px solid #ddd",
                        textAlign: "left",
                        paddingLeft: 8,
                        height: ITEM_HEIGHT,
                        width: column.width,
                      }}
                    >
                      {item[column.dataKey]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
