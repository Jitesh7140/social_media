import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(false); // Auth (A small)
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        if (response.data.status === 'Success') {
          setAuth(true);
          // console.log("Authenticated user:", response.data.name); // Debugging ke liye
          setName(response.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch(error => {
        setAuth(false);
        // console.error("Auth check failed:", error);
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout')
      .then(res => {
        if (res.data.status === 'Success') {
          setAuth(false);
          navigate('/login');
          window.location.reload(); // Refresh to clear state
        }
      }).catch(err => console.log(err));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/home" className="text-2xl font-bold text-indigo-600 tracking-tight">
              MyBrand
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/home" className="text-gray-700 hover:text-indigo-600 font-medium transition">Home</Link>
            <Link to="#" className="text-gray-700 hover:text-indigo-600 font-medium transition">Features</Link>
            
            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              {auth ? (
                <>
                  <span className="text-gray-700 font-semibold text-sm">Hi, {name}!</span>
                  <button 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-medium px-3 py-2 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 text-sm">
                    Log in
                  </Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 shadow-sm transition transform hover:scale-105 active:scale-95 text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Button Code (Same as yours) */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;