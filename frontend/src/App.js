import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  
  // Form state
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  const handleFormReset = () => {
    setForm({ name: "", email: "" });
    setSubmitted(null);
  };

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

      <h2 style={{ marginTop: "30px" }}>Form Example — single state object</h2>

      <form onSubmit={handleFormSubmit} style={{ display: "inline-block", textAlign: "left", marginTop: 10 }}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Name: <br />
            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Your name"
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Email: <br />
            <input
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div style={{ marginTop: 8 }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleFormReset} style={{ marginLeft: 8 }}>
            Reset
          </button>
        </div>
      </form>

      {submitted && (
        <p style={{ marginTop: 12 }}>
          Submitted: <strong>{submitted.name || "(no name)"}</strong> — {submitted.email || "(no email)"}
        </p>
      )}

    </div>
    
  );
}


export default App;
