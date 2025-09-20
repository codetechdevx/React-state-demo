import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: taskInput }),
    })
    .then(res => res.json())
    .then(newTask => {
      setTasks([...tasks, newTask]);
      setTaskInput("");
    });
  };

  const removeTask = (id) => {
  fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" })
    .then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

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

  useEffect(() => {
  fetch("http://localhost:5000/api/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.error("Error fetching tasks:", err));
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

      <h2 style={{ marginTop: "30px" }}>To-Do List Example</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask} style={{ marginLeft: "8px" }}>Add Task</button>
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.length === 0 ? (
          <li>No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: "6px" }}>
              {task.text}
              <button
                onClick={() => removeTask(task._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>


    </div>
    
  );
}


export default App;
