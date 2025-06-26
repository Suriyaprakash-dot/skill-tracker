// src/pages/Scheduler.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { Clock, CalendarDays } from 'lucide-react';

function Scheduler() {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setTasks(loadFromStorage('schedulerTasks') || []);
  }, []);

  useEffect(() => {
    saveToStorage('schedulerTasks', tasks);
  }, [tasks]);

  const addTask = () => {
    if (!task || !time) return;
    const newTask = { task, time };
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTask('');
    setTime('');
  };

  const deleteTask = (i) => {
    const updated = tasks.filter((_, index) => index !== i);
    setTasks(updated);
  };

  const editTask = (i) => {
    setTask(tasks[i].task);
    setTime(tasks[i].time);
    setEditingIndex(i);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 bg-cover bg-center flex justify-center items-start pt-16 overflow-hidden"
    >
      <motion.div
        className="bg-white/20 backdrop-blur-xl p-6 rounded-xl shadow-2xl w-full max-w-md mx-auto text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <CalendarDays className="w-7 h-7 text-yellow-300" />
          Learning Scheduler
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 rounded bg-white text-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-1/3 p-2 rounded bg-white text-black focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 rounded font-semibold"
          >
            {editingIndex !== null ? 'Update' : 'Add'}
          </motion.button>
        </div>

        <ul className="space-y-3 mt-4">
          <AnimatePresence>
            {tasks.map((t, i) => (
              <motion.li
                key={i}
                className="bg-white/90 p-3 rounded shadow text-black flex justify-between items-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="font-semibold">{t.task}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {t.time}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => editTask(i)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(i)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
}

export default Scheduler;
