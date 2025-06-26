// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layers, UserCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition duration-300 ${
      isActive
        ? 'bg-white text-red-600 font-semibold'
        : 'hover:bg-white/20 hover:text-white'
    }`;

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMenu = () => setIsMobileOpen(false);

  const renderLinks = (
    <>
      <NavLink to="/" className={navClass} onClick={closeMenu}>
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink to="/activity" className={navClass} onClick={closeMenu}>
            Activity
          </NavLink>
          <NavLink to="/progress" className={navClass} onClick={closeMenu}>
            Progress
          </NavLink>
          <NavLink to="/scheduler" className={navClass} onClick={closeMenu}>
            Scheduler
          </NavLink>
          <NavLink to="/profile" className={navClass} onClick={closeMenu}>
            <UserCircle className="w-6 h-6" />
          </NavLink>
          <button
            onClick={() => {
              logout();
              navigate('/');
              closeMenu();
            }}
            className="ml-2 text-sm underline hover:text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/signin" className={navClass} onClick={closeMenu}>
            Sign In
          </NavLink>
          <NavLink to="/signup" className={navClass} onClick={closeMenu}>
            Sign Up
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-black text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <Layers className="w-6 h-6" />
          SkillTracker
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {renderLinks}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileOpen && (
        <div className="md:hidden mt-2 flex flex-col items-start space-y-2 px-4">
          {renderLinks}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
