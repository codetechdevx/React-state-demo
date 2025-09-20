import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching message:", err));
  }, []); 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React State Demo</h1>

      <h2>Counter Example</h2>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      <h2 style={{ marginTop: "30px" }}>Text Input Example</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>

      <h2 style={{ marginTop: "30px" }}>Calling the Backend API</h2>
      {message ? <p>Message from backend: {message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
