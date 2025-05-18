import { useEffect, useState, useRef } from "react";

function useDidUpdate(callback, dependencies) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
  }, dependencies);
}

// turn off the strict mode first to actually see it work
export default function ComponentDidUpdateHook() {
  const [count, setCount] = useState(0);

  useDidUpdate(() => {
    console.log("Count is updated", count);
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Count
      </button>
    </div>
  );
}
