// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !confirm) return toast.error('All fields are required');
    if (!emailRegex.test(email)) return toast.error('Enter a valid email address');
    if (password !== confirm) return toast.error('Passwords do not match');
    if (!agreed) return toast.error('You must accept the terms & privacy policy');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || 'Signup failed');

      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('joinDate', data.user.joinDate);
      toast.success('Signup successful!');
      navigate('/signin');
    } catch (err) {
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1601597111158-44f483be248c?auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-black/70 p-8 rounded-lg text-white w-full max-w-md backdrop-blur-lg shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-blue-300">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/80 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-white/80 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-white/80 text-black"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <label className="text-sm flex items-start gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1"
          />
          I agree to the <span className="underline text-blue-300">terms & privacy policy</span>
        </label>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white p-3 rounded font-semibold"
        >
          Sign Up
        </motion.button>
      </motion.form>
    </div>
  );
}

export default SignUp;
