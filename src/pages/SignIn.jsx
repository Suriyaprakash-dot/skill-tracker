// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Both fields are required');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || 'Login failed');

      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('joinDate', data.user.joinDate);
      login();
      toast.success('Welcome back!');
      navigate('/activity');
    } catch (err) {
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1581091012184-7f129e78a0f4?auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/70 backdrop-blur-lg p-8 rounded-lg text-white w-full max-w-md shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-300">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/80 text-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-white/80 text-black focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded font-semibold"
          type="submit"
        >
          Sign In
        </motion.button>
      </motion.form>
    </div>
  );
}

export default SignIn;
