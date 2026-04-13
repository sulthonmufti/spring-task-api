import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Ambil data saat halaman dimuat
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8081/api/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTitle) return;
    await axios.post("http://localhost:8081/api/tasks", {
      title: newTitle,
      completed: false
    });
    setNewTitle("");
    fetchTasks(); // Refresh daftar
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8081/api/tasks/${id}`);
    fetchTasks(); // Refresh daftar
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>
      <input 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
        placeholder="Tambah tugas baru..." 
      />
      <button onClick={addTask}>Tambah</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} 
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px', color: 'red' }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;