import React, { useState, useTransition } from "react";

const names = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

async function slowFilter(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        names.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
      );
    }, 5000);
  });
}

function NoTransitionList() {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState(names);

  const handleChange = async (e) => {
    const value = e.target.value;
    setInput(value);
    const result = await slowFilter(value);
    setFiltered(result);
  };

  return (
    <div>
      <h2>Without useTransition</h2>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Type something"
      />
      <ul>
        {filtered.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
export default function WithTransitionList() {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState(names);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    startTransition(async () => {
      const result = await slowFilter(value);
      setFiltered(result);
    });
  };

  return (
    <div>
      <h2>With useTransition</h2>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Type something"
      />
      {isPending && <p>Filtering...</p>}
      <ul>
        {filtered.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
