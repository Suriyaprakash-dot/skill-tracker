import React, { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const priorityColors = {
  Low: "bg-green-400",
  Medium: "bg-yellow-400",
  High: "bg-red-400",
};

function Activity() {
  const [tasks, setTasks] = useState([]);
  const [skill, setSkill] = useState("");
  const [type, setType] = useState("Coding");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (!skill || !type || !taskDesc) return;
    const newTask = { skill, type, taskDesc, priority };
    setTasks([...tasks, newTask]);
    setSkill("");
    setType("Coding");
    setTaskDesc("");
    setPriority("Medium");
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex justify-center items-start pt-12 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-3xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">📋 Skill Activity Manager</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Skill Name"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="p-3 rounded-lg bg-white text-black w-full"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 rounded-lg bg-white text-black w-full"
          >
            <option value="Coding">Coding</option>
            <option value="Designing">Designing</option>
            <option value="Communication">Communication</option>
            <option value="Marketing">Marketing</option>
            <option value="Writing">Writing</option>
          </select>
          <input
            type="text"
            placeholder="Task Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="p-3 rounded-lg bg-white text-black w-full"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            onClick={addTask}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <PlusCircle className="w-5 h-5" /> Add Task
          </button>
        </div>

        <AnimatePresence>
          {tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4"
            >
              {tasks.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  layout
                  className={`p-4 rounded-xl flex justify-between items-center shadow-lg ${priorityColors[t.priority]}`}
                >
                  <div>
                    <p className="font-semibold">🔧 Skill: {t.skill}</p>
                    <p className="text-sm">📁 Type: {t.type}</p>
                    <p className="text-sm italic">📝 {t.taskDesc}</p>
                    <p className="text-xs mt-1">Priority: {t.priority}</p>
                  </div>
                  <button
                    onClick={() => deleteTask(i)}
                    className="text-white hover:text-black"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {tasks.length === 0 && (
          <p className="text-center text-gray-300 mt-6 italic">No tasks yet. Add something awesome! ✨</p>
        )}
      </motion.div>
    </div>
  );
}

export default Activity;
