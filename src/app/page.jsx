"use client";

import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  function onClick() {
    alert(`Input is: ${input}`);
  }

  function onInputChange(event) {
    setInput(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        placeholder="Enter new task here"
      />
      <br />
      <button type="submit" onClick={onClick}>
        Submit
      </button>
    </div>
  );
}
