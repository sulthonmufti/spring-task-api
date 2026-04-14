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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">
          My Tasks
        </h1>
        
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text"
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            placeholder="Apa yang ingin dikerjakan?" 
          />
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
            onClick={addTask}
          >
            Add
          </button>
        </div>
  
        {/* List Section */}
        <ul className="space-y-3">
          {tasks.map(task => (
            <li 
              key={task.id} 
              className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
            >
              <span className="text-slate-700 font-medium">{task.title}</span>
              <button 
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                onClick={() => deleteTask(task.id)}
                title="Hapus tugas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
  
        {tasks.length === 0 && (
          <p className="text-center text-slate-400 mt-4 text-sm italic">Belum ada tugas hari ini.</p>
        )}
      </div>
    </div>
  );
}

export default App;