import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("all"); // State untuk filter
  const [searchTerm, setSearchTerm] = useState(""); //SEARCH: State untuk menampung teks pencarian

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
       //const response = await axios.get("http://10.66.90.225:8081/api/tasks"); //di ZeroTier pribadi, run pakai: $env:HOST="0.0.0.0"; npm start
      const response = await axios.get("http://localhost:8081/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    }
  };

  // 1. MENGUBAH addTask
  const addTask = async () => {
    if (!newTitle.trim()) {
      Swal.fire('Oops!', 'Judul tugas tidak boleh kosong', 'error');
      return;
    }

    //await axios.post("http://10.66.90.225:8081/api/tasks", {
      await axios.post("http://localhost:8081/api/tasks", {
      title: newTitle,
      completed: false
    });
    
    setNewTitle("");
    fetchTasks();
    
    // Notifikasi sukses
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Tugas baru ditambahkan',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const toggleComplete = async (task) => {
    //await axios.put(`http://10.66.90.225:8081/api/tasks/${task.id}`, {
      await axios.put(`http://localhost:8081/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Tugas akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
      //await axios.delete(`http://10.66.90.225:8081/api/tasks/${id}`);
      await axios.delete(`http://localhost:8081/api/tasks/${id}`);
      fetchTasks();
      Swal.fire('Terhapus!', 'Tugas telah dibuang.', 'success');
    }
  };

  // 2. LOGIKA FILTER & COUNTER (filteredTasks)
  const pendingTasks = tasks.filter(t => !t.completed).length;

  const filteredTasks = tasks.filter(task => {
    // Cek apakah tugas sesuai dengan filter (All/Active/Completed)
    const matchesFilter = 
      filter === "active" ? !task.completed :
      filter === "completed" ? task.completed : true;

    // Cek apakah judul tugas mengandung teks dari searchTerm
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  //Framer Motion (Animasi Task)
  const taskAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center">My Tasks</h1>
        
        {/* COUNTER */}
        <p className="text-center text-slate-500 mb-6 mt-2">
          <span className="font-bold text-blue-600">{pendingTasks}</span> tugas tersisa
        </p>
        
        {/* INPUT SECTION */}
        <div className="flex gap-2 mb-4">
          <input 
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            placeholder="Tambah tugas baru..." 
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition" onClick={addTask}>
            Add
          </button>
        </div>

        {/*SEARCH: Input UI Pencarian */}
        <div className="mb-6">
          <input 
            type="text"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50 focus:ring-2 focus:ring-blue-400 outline-none text-sm italic"
            placeholder="Cari tugas Anda di sini..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 3. TOMBOL FILTER DI UI */}
        <div className="flex justify-center gap-2 mb-6 text-sm">
          {["all", "active", "completed"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full capitalize transition ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LIST SECTION - MENGGUNAKAN filteredTasks.map */}
        <ul className="space-y-3">
          {/*Framer Motion (AnimatePresence membungkus daftar map) */}
          <AnimatePresence>
            {filteredTasks.map(task => (
              /*Framer Motion (Mengganti <li> jadi <motion.li>) */
              <motion.li 
                key={task.id}
                layout // Menghaluskan pergeseran list saat ada item dihapus
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={taskAnimation}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <span className={`font-medium transition-all ${
                    task.completed ? 'line-through text-gray-400' : 'text-slate-700'
                  }`}>
                    {task.title}
                  </span>
                </div>
                <button className="text-red-400 hover:text-red-600 p-2" onClick={() => deleteTask(task.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filteredTasks.length === 0 && (
          <p className="text-center text-slate-400 mt-6 italic text-sm">Tidak ada tugas ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default App;