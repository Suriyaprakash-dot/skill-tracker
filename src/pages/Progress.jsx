import React, { useState } from 'react';
import { CircleCheckBig, Brain, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';

const initialSkills = [
  { name: 'JavaScript', level: 'Advanced', progress: 85 },
  { name: 'React', level: 'Intermediate', progress: 60 },
  { name: 'Python', level: 'Beginner', progress: 30 }
];

function Progress() {
  const [skills, setSkills] = useState(initialSkills);

  const getColor = (progress) => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleUpdate = (index, amount) => {
    setSkills(prev => {
      const updated = [...prev];
      updated[index].progress = Math.min(100, Math.max(0, updated[index].progress + amount));
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-16 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 overflow-hidden">
      
      {/* Animated Background Glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="relative z-10 bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center gap-2">
          <Brain className="w-7 h-7 text-yellow-300" />
          Skill Progress Tracker
        </h2>

        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="mb-6 bg-white/90 p-4 rounded-lg shadow border"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <Hammer className="w-5 h-5 text-gray-700" />
                {skill.name}
                <span className="text-sm text-gray-500">({skill.level})</span>
              </h3>
              <span className="text-sm font-medium text-gray-600">{skill.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
              <motion.div
                className={`h-4 rounded ${getColor(skill.progress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpdate(index, 10)}
                className="text-green-600 hover:underline text-sm"
              >
                + Improve
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpdate(index, -10)}
                className="text-red-500 hover:underline text-sm"
              >
                - Reduce
              </motion.button>
            </div>
          </motion.div>
        ))}

        <div className="mt-6 text-center text-sm text-white flex items-center justify-center gap-1">
          <CircleCheckBig className="w-4 h-4" />
          Track your growth and keep sharpening your skills!
        </div>
      </motion.div>
    </div>
  );
}

export default Progress;
